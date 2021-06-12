import { MailerInterface } from './email.interface';
import { OutdatedPackageDto } from '../dependabot-core/registry-checker/dto/outdated-package.dto';

abstract class AbstractMailer implements MailerInterface {
  abstract sendMail(params: { to: string; subject: string; body: string }): Promise<boolean>;

  async sendRepoStatus(params: {
    to: string;
    repoUser?: string;
    repoName?: string;
    outdatedDependencies: OutdatedPackageDto[];
  }) {
    const { to, repoUser, repoName, outdatedDependencies } = params;
    console.log('sending mail...', to);
    const subject = `Dependabot Status for ${repoUser}/${repoName}`;
    const body = outdatedDependencies
      .map((dep) => `${dep.name} -> current: ${dep.current}, wanted: ${dep.wanted}`)
      .join('<br/>');
    await this.sendMail({ to, subject, body });
  }
}

export default AbstractMailer;
