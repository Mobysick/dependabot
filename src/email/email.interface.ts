import { OutdatedPackage } from '../dependabot-core/registry-checker/types/outdated-package.type';

export interface MailerInterface {
  sendRepoStatus(params: {
    to: string;
    repoUser?: string;
    repoName?: string;
    outdatedDependencies: OutdatedPackage[];
  }): Promise<void>;

  sendMail(params: { to: string; subject: string; body: string }): Promise<boolean>;
}
