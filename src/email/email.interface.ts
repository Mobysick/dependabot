import { OutdatedPackageDto } from '../dependabot-core/registry-checker/dto/outdated-package.dto';

export interface MailerInterface {
  sendRepoStatus(params: {
    to: string;
    repoUser?: string;
    repoName?: string;
    outdatedDependencies: OutdatedPackageDto[];
  }): Promise<void>;

  sendMail(params: { to: string; subject: string; body: string }): Promise<boolean>;
}
