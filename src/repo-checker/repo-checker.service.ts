import axios from 'axios';
import { NodeDependencyParserService } from '../dependency-parser/node-dependency-parser.service';
import { PhpDependencyParserService } from '../dependency-parser/php-dependency-parser.service';
import { JsonParserService } from '../file-parser/json-parser.service';
import { CreateRepoCheckerParamsDto } from './create-repo-checker-params.dto';
import { Language } from './language.interface';
import { NpmRegistryCheckerService } from '../registry-checker/npm-registry-checker.service';
import { PhpRegistryCheckerService } from '../registry-checker/php-registry-checker.service';

export abstract class RepoCheckerService {
  protected readonly languageOptions: Language[] = [
    {
      language: 'node',
      dependencyFile: 'package.json',
      fileParser: new JsonParserService(),
      dependencyParser: new NodeDependencyParserService(),
      registryChecker: new NpmRegistryCheckerService(),
    },
    {
      language: 'php',
      dependencyFile: 'composer.json',
      fileParser: new JsonParserService(),
      dependencyParser: new PhpDependencyParserService(),
      registryChecker: new PhpRegistryCheckerService(),
    },
  ];

  protected baseUrl: string;

  constructor(dto: CreateRepoCheckerParamsDto) {
    this.baseUrl = this.getBaseUrl(dto);
  }

  protected abstract getBaseUrl(dto: CreateRepoCheckerParamsDto): string;

  async parseDependencies(): Promise<void> {
    for (const langOption of this.languageOptions) {
      const url = this.baseUrl + langOption.dependencyFile;
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const content = await langOption.fileParser.parse(
            Buffer.from(response.data.content, response.data.encoding).toString(),
          );
          const dependencyList = langOption.dependencyParser.parse(content);

          console.log('dependency list', dependencyList);

          const latestVersions = await Promise.all(
            dependencyList.map((dependency) =>
              langOption.registryChecker.getLatestVersion(dependency.key),
            ),
          );

          console.log('latest versions', latestVersions);

          const outdatedVersions = [];
          for (let i = 0; i < dependencyList.length; i++) {
            const isOutdated = langOption.registryChecker.isOutdated(
              dependencyList[i].version,
              latestVersions[i],
            );
            if (isOutdated) {
              outdatedVersions.push({ package: dependencyList[i].key, ...isOutdated });
            }
          }

          console.log('outdatedVersions', outdatedVersions);

          // return outdatedVersions;
        }
      } catch (error) {
        // throw new Error(error);
      }
    }
  }
}
