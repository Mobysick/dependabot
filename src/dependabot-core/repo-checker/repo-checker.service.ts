import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { NotFoundError } from '../../error/exceptions/not-found.error';
import { HttpApi } from '../../http/http-api';
import { CreateRepoCheckerParams } from './types/create-repo-checker-params.type';
import { DependencyLanguage } from './types/dependency-language.type';
import { FetchedDependencyContent } from './types/fetched-dependency-content.type';
import { LanguageOption } from './types/language-option.enum';

export abstract class RepoCheckerService {
  protected user: string;
  protected repoName: string;

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
    this.repoName = params.repoName;
  }

  protected abstract getRepoUrl(): string;

  protected abstract getPackageFileUrl(fileName: string): string;

  async fetchDependencyContent(): Promise<FetchedDependencyContent> {
    console.log('Checking repository...');
    try {
      await HttpApi.get(this.getRepoUrl());
      console.log(`Found repository: ${this.user}/${this.repoName}`);
    } catch (error) {
      throw new NotFoundError(ApiErrorMessage.REPOSITORY_NOT_FOUND);
    }

    for (const langOption of this.languageOptions) {
      const { language, dependencyFile } = langOption;
      const url = this.getPackageFileUrl(dependencyFile);
      try {
        const response = await HttpApi.get(url);
        if (response.status === 200) {
          console.log(`Found package file: ${dependencyFile} for language: ${language}`);
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
