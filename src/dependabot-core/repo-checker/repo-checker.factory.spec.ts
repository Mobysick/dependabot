import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { GithubRepoCheckerService } from './github-repo-checker.service';
import { RepoCheckerFactory } from './repo-checker.factory';
import { RepoOption } from './types/repo-option.enum';

describe('RepoCheckerFactory', () => {
  describe('getService', () => {
    it('returns GithubRepoChecker instance', () => {
      const service = RepoCheckerFactory.getService(RepoOption.GITHUB, {
        user: 'user',
        repo: 'repo',
      });
      expect(service).toBeInstanceOf(GithubRepoCheckerService);
    });

    it('throws error with unknown repo type', () => {
      expect(() =>
        RepoCheckerFactory.getService('bla bla repo' as RepoOption, {
          user: 'user',
          repo: 'repo',
        }),
      ).toThrow(new BadRequestError(ApiErrorMessage.REPOSITORY_NOT_SUPPORTED));
    });
  });
});
