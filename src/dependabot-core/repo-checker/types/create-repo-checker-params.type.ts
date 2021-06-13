import { RepoHost } from './repo-host.enum';

export type CreateRepoCheckerParams = {
  repoHost: RepoHost;
  user: string;
  repoName: string;
};
