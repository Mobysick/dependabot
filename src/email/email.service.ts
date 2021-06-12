import { OutdatedPackage } from '../dependabot-core/registry-checker/types/outdated-package.type';
import { MailerInterface } from './email.interface';

abstract class AbstractMailer implements MailerInterface {
  abstract sendMail(params: { to: string; subject: string; body: string }): Promise<boolean>;

  async sendRepoStatus(params: {
    to: string;
    repoUser?: string;
    repoName?: string;
    outdatedDependencies: OutdatedPackage[];
  }) {
    const { to, repoUser, repoName, outdatedDependencies } = params;
    console.log('sending mail...', to);
    const subject = `Dependabot Status for ${repoUser}/${repoName}`;
    let body = `${outdatedDependencies.length} packages are outdated.\n<br/>\n<br/>`;
    body += outdatedDependencies
      .map((dep) => `${dep.name} -> current: ${dep.current}, wanted: ${dep.wanted}`)
      .join('\n<br/>');
    await this.sendMail({ to, subject, body });
  }
}

export default AbstractMailer;
