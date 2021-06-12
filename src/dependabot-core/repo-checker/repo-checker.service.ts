import axios from 'axios';
import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { CreateRepoCheckerParams } from './types/create-repo-checker-params.type';
import { DependencyLanguage } from './types/dependency-language.type';
import { FetchedDependencyContent } from './types/fetched-dependency-content.type';
import { LanguageOption } from './types/language-option.enum';

export abstract class RepoCheckerService {
  protected user: string;
  protected repo: string;

  protected readonly languageOptions: DependencyLanguage[] = [
    {
      language: LanguageOption.NODE,
      dependencyFile: 'package.json',
    },
    {
      language: LanguageOption.PHP,
      dependencyFile: 'composer.json',
    },
  ];

  constructor(params: CreateRepoCheckerParams) {
    this.user = params.user;
    this.repo = params.repo;
  }

  protected abstract getPackageFileUrl(fileName: string): string;

  async fetchDependencyContent(): Promise<FetchedDependencyContent> {
    for (const langOption of this.languageOptions) {
      const { language, dependencyFile } = langOption;
      const url = this.getPackageFileUrl(dependencyFile);
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          return {
            language,
            content: Buffer.from(response.data.content, response.data.encoding).toString(),
          };
        }
      } catch (error) {}
    }
    throw new BadRequestError(ApiErrorMessage.DEPENDENCY_FILE_NOT_FOUND);
  }
}
