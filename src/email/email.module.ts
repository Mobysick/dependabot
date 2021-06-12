import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';

@Module({
  imports: [],
  providers: [SmtpService],
  exports: [SmtpService],
})
export class EmailModule {}
