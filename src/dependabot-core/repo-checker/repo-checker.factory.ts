import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { GithubRepoCheckerService } from './github-repo-checker.service';
import { RepoCheckerService } from './repo-checker.service';
import { CreateRepoCheckerParams } from './types/create-repo-checker-params.type';
import { RepoOption } from './types/repo-option.enum';

export class RepoCheckerFactory {
  static getService(repoOption: RepoOption, params: CreateRepoCheckerParams): RepoCheckerService {
    switch (repoOption) {
      case RepoOption.GITHUB: {
        return new GithubRepoCheckerService(params);
      }
      default: {
        throw new BadRequestError(ApiErrorMessage.REPOSITORY_NOT_SUPPORTED);
      }
    }
  }
}
