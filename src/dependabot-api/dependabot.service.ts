import { Injectable } from '@nestjs/common';
import { OutdatedPackageDto } from '../registry-checker/dto/outdated-package.dto';
import { RegistryCheckerFactory } from '../registry-checker/registry-checker.factory';
import { CreateRepoCheckerParamsDto } from '../repo-checker/create-repo-checker-params.dto';
import { RepoCheckerFactory } from '../repo-checker/repo-checker.factory';
import { RepoCheckerService } from '../repo-checker/repo-checker.service';
import { RepoOption } from '../repo-checker/repo.enum';
import { RepoCheckReqDto } from './dto/repo-check-req.dto';
import { RepoCheckResDto } from './dto/repo-check-res-dto';

@Injectable()
export class DependabotService {
  async checkRepo(dto: RepoCheckReqDto) {
    const outdatedDependencies = await this.getOutdatedDependencies(dto);

    if (dto.subscribe) {
      // TODO: Schedule.
    }

    return new RepoCheckResDto(outdatedDependencies);
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
