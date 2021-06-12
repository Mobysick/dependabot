export interface MailerInterface {
  sendTestMail(to: string): Promise<void>;

  sendMail(params: { to: string; subject: string; body: string }): Promise<boolean>;
}
