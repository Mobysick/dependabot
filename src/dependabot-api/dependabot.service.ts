import { Injectable } from '@nestjs/common';
import schedule from 'node-schedule';
import { DependencyParserFactory } from '../dependabot-core/dependency-parser/dependency-parser.factory';
import { FileParserFactory } from '../dependabot-core/file-parser/file-parser.factory';
import { RegistryCheckerFactory } from '../dependabot-core/registry-checker/registry-checker.factory';
import { OutdatedPackage } from '../dependabot-core/registry-checker/types/outdated-package.type';
import { RepoCheckerFactory } from '../dependabot-core/repo-checker/repo-checker.factory';
import { RepoCheckerService } from '../dependabot-core/repo-checker/repo-checker.service';
import { CreateRepoCheckerParams } from '../dependabot-core/repo-checker/types/create-repo-checker-params.type';
import { RepoOption } from '../dependabot-core/repo-checker/types/repo-option.enum';
import { SmtpService } from '../email/smtp.service';
import { ApiErrorMessage } from '../error/api-error-message';
import { NotFoundError } from '../error/exceptions/not-found.error';
import { RepoCheckReqDto } from './dto/repo-check-req.dto';
import { RepoCheckResDto } from './dto/repo-check-res-dto';

@Injectable()
export class DependabotService {
  constructor(private emailService: SmtpService) {}

  async checkRepo(dto: RepoCheckReqDto) {
    const outdatedDependencies = await this.getOutdatedDependencies({
      user: dto.user,
      repo: dto.repo,
    });

    if (dto.subscribe) {
      this.subscribe(dto);
    }

    return new RepoCheckResDto(outdatedDependencies);
  }

  private getNextScheduledMailDate(): Date {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 1);
    // date.setDate(date.getDate() + 1);
    return date;
  }

  // Use redis based bull queue and add delayed jobs in prod.
  private async subscribe(dto: RepoCheckReqDto) {
    schedule.scheduleJob(this.getNextScheduledMailDate(), () => {
      this.sendReport(dto);
      this.subscribe(dto);
    });
  }

  private async sendReport(dto: RepoCheckReqDto): Promise<OutdatedPackage[]> {
    const { user, repo, emails } = dto;
    const outdatedDependencies = await this.getOutdatedDependencies({
      user,
      repo,
    });
    await Promise.all(
      emails.map((email) =>
        this.emailService.sendRepoStatus({
          to: email,
          repoName: repo,
          repoUser: user,
          outdatedDependencies,
        }),
      ),
    );
    return outdatedDependencies;
  }

  private async getOutdatedDependencies(dto: CreateRepoCheckerParams): Promise<OutdatedPackage[]> {
    const repoCheckerService: RepoCheckerService = RepoCheckerFactory.getService(
      RepoOption.GITHUB,
      dto,
    );
    const { language, content } = await repoCheckerService.fetchDependencyContent();

    if (!content) {
      throw new NotFoundError(ApiErrorMessage.DEPENDENCY_FILE_NOT_FOUND);
    }

    const fileParser = FileParserFactory.getParser(language);
    const fileContentObject = await fileParser.parse(content);

    const dependencyParser = DependencyParserFactory.getParser(language);
    const dependencyList = dependencyParser.parse(fileContentObject);

    const registryChecker = RegistryCheckerFactory.getService(language);

    const latestVersions = await Promise.all(
      dependencyList.map((dependency) => registryChecker.getLatestVersion(dependency.key)),
    );
    // TODO: Review.
    const outdatedPackages: OutdatedPackage[] = [];
    for (let i = 0; i < dependencyList.length; i++) {
      const dependency = dependencyList[i];
      const latestVersion = latestVersions[i];
      const outdatedPackage = registryChecker.isOutdated(dependency.version, latestVersion);
      if (outdatedPackage) {
        outdatedPackages.push({
          name: dependency.key,
          current: outdatedPackage.current,
          wanted: outdatedPackage.wanted,
        });
      }
    }

    return outdatedPackages;
  }
}
