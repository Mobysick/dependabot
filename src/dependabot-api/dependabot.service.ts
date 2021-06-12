import { Injectable } from '@nestjs/common';
import schedule from 'node-schedule';
import { DependencyParserFactory } from '../dependabot-core/dependency-parser/dependency-parser.factory';
import { FileParserFactory } from '../dependabot-core/file-parser/file-parser.factory';
import { OutdatedPackageDto } from '../dependabot-core/registry-checker/dto/outdated-package.dto';
import { RegistryCheckerFactory } from '../dependabot-core/registry-checker/registry-checker.factory';
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
    const outdatedDependencies = await this.sendReport(dto);

    if (dto.subscribe) {
      // TODO: Schedule.
      this.subscribe(dto);
    }

    return new RepoCheckResDto(outdatedDependencies);
  }

  private async subscribe(dto: RepoCheckReqDto) {
    // const id = `${dto.user}-${dto.repo}-${dto?.emails?.join('-')}`;
    const date = new Date();
    date.setMinutes(date.getMinutes() + 1);
    // date.setDate(date.getDate() + 1);
    schedule.scheduleJob(date, () => {
      this.sendReport(dto);
      this.subscribe(dto);
    });
  }

  private async sendReport(dto: RepoCheckReqDto): Promise<OutdatedPackageDto[]> {
    const outdatedDependencies = await this.getOutdatedDependencies({
      user: dto.user,
      repo: dto.repo,
    });
    // TODO: Uncomment before release.
    console.log(this.emailService);
    // if (dto.emails?.length) {
    //   await Promise.all(
    //     dto.emails?.map((email) =>
    //       this.emailService.sendRepoStatus({
    //         to: email,
    //         repoName: dto.repo,
    //         repoUser: dto.user,
    //         outdatedDependencies,
    //       }),
    //     ),
    //   );
    // }
    return outdatedDependencies;
  }

  private async getOutdatedDependencies(
    dto: CreateRepoCheckerParams,
  ): Promise<OutdatedPackageDto[]> {
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

    // TODO: Review.
    const latestVersions = await Promise.all(
      dependencyList.map((dependency) => registryChecker.getLatestVersion(dependency.key)),
    );
    const outdatedPackages: OutdatedPackageDto[] = [];
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
