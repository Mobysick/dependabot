import { Injectable } from '@nestjs/common';
import { DependencyParserFactory } from '../dependabot-core/dependency-parser/dependency-parser.factory';
import { Dependency } from '../dependabot-core/dependency-parser/types/dependency.type';
import { FileParserFactory } from '../dependabot-core/file-parser/file-parser.factory';
import { RegistryCheckerFactory } from '../dependabot-core/registry-checker/registry-checker.factory';
import { RegistryCheckerService } from '../dependabot-core/registry-checker/registry-checker.service';
import { OutdatedPackage } from '../dependabot-core/registry-checker/types/outdated-package.type';
import { RepoCheckerFactory } from '../dependabot-core/repo-checker/repo-checker.factory';
import { RepoCheckerService } from '../dependabot-core/repo-checker/repo-checker.service';
import { CreateRepoCheckerParams } from '../dependabot-core/repo-checker/types/create-repo-checker-params.type';
import { ApiErrorMessage } from '../error/api-error-message';
import { NotFoundError } from '../error/exceptions/not-found.error';

@Injectable()
export class DependabotCheckerService {
  public async getOutdatedDependencies(dto: CreateRepoCheckerParams): Promise<OutdatedPackage[]> {
    const repoCheckerService: RepoCheckerService = RepoCheckerFactory.getService(dto);
    const { language, content } = await repoCheckerService.fetchDependencyContent();

    if (!content) {
      throw new NotFoundError(ApiErrorMessage.DEPENDENCY_FILE_NOT_FOUND);
    }

    console.log('Parsing dependencies...');
    const fileParser = FileParserFactory.getParser(language);
    const fileContentObject = await fileParser.parse(content);

    const dependencyParser = DependencyParserFactory.getParser(language);
    const dependencyList = dependencyParser.parse(fileContentObject);
    console.log(`Parsed ${dependencyList.length} dependencies`);

    const registryChecker = RegistryCheckerFactory.getService(language);

    console.log(`Fetching latest versions...`);
    const latestVersions = await Promise.all(
      dependencyList.map((dependency) => registryChecker.getLatestVersion(dependency.key)),
    );

    const outdatedPackages = this.comparePackages(registryChecker, dependencyList, latestVersions);

    console.log(`${outdatedPackages.length} of ${dependencyList.length} dependencies are outdated`);
    console.log(outdatedPackages);

    return outdatedPackages;
  }

  public comparePackages(
    registryChecker: RegistryCheckerService,
    dependencyList: Dependency[],
    latestVersions: string[],
  ): OutdatedPackage[] {
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
