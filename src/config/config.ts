import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';
dotenv.config({ path: '.env' });

type ContainerConfigValues = {
  environment: string;
  port: string;
  smtp: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
  };
};

const env = cleanEnv(process.env, {
  ENVIRONMENT: str(),
  PORT: str(),
  SMTP_HOST: str(),
  SMTP_PORT: num(),
  SMTP_USER: str(),
  SMTP_PASS: str(),
  SMTP_FROM: str({ default: 'no-reply@dependabot.com' }),
});

export const config: ContainerConfigValues = {
  environment: env.ENVIRONMENT,
  port: env.PORT,
  smtp: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    from: env.SMTP_FROM,
  },
};
