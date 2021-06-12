import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { DependabotController } from './dependabot.controller';
import { DependabotService } from './dependabot.service';

@Module({
  imports: [EmailModule],
  providers: [DependabotService],
  controllers: [DependabotController],
})
export class DependabotModule {}
