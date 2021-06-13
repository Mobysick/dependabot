import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { DependabotCheckerService } from './checker.service';
import { DependabotController } from './dependabot.controller';
import { DependabotService } from './dependabot.service';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [EmailModule],
  providers: [DependabotService, DependabotCheckerService, SubscriptionService],
  controllers: [DependabotController],
})
export class DependabotModule {}
