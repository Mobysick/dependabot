import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { GithubRepoCheckerService } from './github-repo-checker.service';
import { RepoCheckerFactory } from './repo-checker.factory';
import { RepoHost } from './types/repo-host.enum';

describe('RepoCheckerFactory', () => {
  describe('getService', () => {
    it('returns GithubRepoChecker instance', () => {
      const service = RepoCheckerFactory.getService({
        repoHost: RepoHost.GITHUB,
        user: 'user',
        repoName: 'repo',
      });
      expect(service).toBeInstanceOf(GithubRepoCheckerService);
    });

    it('throws error with unknown repo type', () => {
      expect(() =>
        RepoCheckerFactory.getService({
          repoHost: 'unexisting repo' as RepoHost,
          user: 'user',
          repoName: 'repo',
        }),
      ).toThrow(new BadRequestError(ApiErrorMessage.REPOSITORY_NOT_SUPPORTED));
    });
  });
});
