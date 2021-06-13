import { RepoHost } from '../../dependabot-core/repo-checker/types/repo-host.enum';

export type SendReportParams = {
  repoHost: RepoHost;
  user: string;
  repoName: string;
  emails: string[];
};
