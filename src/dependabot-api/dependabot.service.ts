import { Injectable } from '@nestjs/common';
import { SmtpService } from '../email/smtp.service';
import { OutdatedPackageDto } from '../registry-checker/dto/outdated-package.dto';
import { RegistryCheckerFactory } from '../registry-checker/registry-checker.factory';
import { CreateRepoCheckerParamsDto } from '../repo-checker/create-repo-checker-params.dto';
import { RepoCheckerFactory } from '../repo-checker/repo-checker.factory';
import { RepoCheckerService } from '../repo-checker/repo-checker.service';
import { RepoOption } from '../repo-checker/repo.enum';
import { RepoCheckReqDto } from './dto/repo-check-req.dto';
import { RepoCheckResDto } from './dto/repo-check-res-dto';

import schedule from 'node-schedule';

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
    const outdatedDependencies = await this.getOutdatedDependencies(dto);
    if (dto.emails?.length) {
      await Promise.all(
        dto.emails?.map((email) =>
          this.emailService.sendRepoStatus({
            to: email,
            repoName: dto.repo,
            repoUser: dto.user,
            outdatedDependencies,
          }),
        ),
      );
    }
    return outdatedDependencies;
  }

  private async getOutdatedDependencies(
    dto: CreateRepoCheckerParamsDto,
  ): Promise<OutdatedPackageDto[]> {
    const repoCheckerService: RepoCheckerService = RepoCheckerFactory.getService(
      RepoOption.GITHUB,
      dto,
    );

    const parsedDependenciesResult = await repoCheckerService.parseDependencies();
    const { language, dependencies } = parsedDependenciesResult;

    const registryChecker = RegistryCheckerFactory.getService(language);

    // TODO: Review.
    const latestVersions = await Promise.all(
      dependencies.map((dependency) => registryChecker.getLatestVersion(dependency.key)),
    );
    const outdatedPackages: OutdatedPackageDto[] = [];
    for (let i = 0; i < dependencies.length; i++) {
      const dependency = dependencies[i];
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
