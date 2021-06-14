import { Injectable } from '@nestjs/common';
import schedule from 'node-schedule';
import { OutdatedPackage } from '../dependabot-core/registry-checker/types/outdated-package.type';
import { SmtpService } from '../email/smtp.service';
import { DependabotCheckerService } from './checker.service';
import { SendReportParams } from './types/send-report-params.type';

@Injectable()
export class SubscriptionService {
  constructor(
    private checkerService: DependabotCheckerService,
    private emailService: SmtpService,
  ) {}

  // Use redis based queue e.g. bull queue and add delayed jobs in prod.
  async subscribe(params: SendReportParams) {
    const date = this.getNextScheduledMailDate();
    schedule.scheduleJob(date, () => {
      this.sendReport(params);
      this.subscribe(params);
    });
    console.log(`Scheduled job for: ${date.toISOString()}`, params);
  }

  private getNextScheduledMailDate(): Date {
    const date = new Date();
    // date.setMinutes(date.getMinutes() + 1); // 1 minute later from now
    date.setDate(date.getDate() + 1); // 1 day later from now
    return date;
  }

  private async sendReport(params: SendReportParams): Promise<OutdatedPackage[]> {
    const { repoHost, user, repoName, emails } = params;
    const outdatedDependencies = await this.checkerService.getOutdatedDependencies({
      repoHost,
      user,
      repoName,
    });
    await Promise.all(
      emails.map((email) =>
        this.emailService.sendRepoStatus({
          to: email,
          repoName,
          repoUser: user,
          outdatedDependencies,
        }),
      ),
    );
    return outdatedDependencies;
  }
}
