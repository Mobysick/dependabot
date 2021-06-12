import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { config } from '../config/config';
import { MailerInterface } from './email.interface';
import AbstractMailer from './email.service';

@Injectable()
export class SmtpService extends AbstractMailer implements MailerInterface {
  transporter: Mail;

  constructor() {
    super();
    this.transporter = createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  async sendMail(params: { to: string; subject: string; body: string }): Promise<boolean> {
    const { to, subject, body } = params;

    try {
      await this.transporter.sendMail({
        from: `"Dependabot" ${config.smtp.from}`,
        to: to,
        subject: subject,
        text: body,
        html: body,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
