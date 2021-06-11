import { Module } from '@nestjs/common';
import { DependabotService } from './dependabot.service';
import { DependabotController } from './dependabot.controller';

@Module({
  providers: [DependabotService],
  controllers: [DependabotController],
})
export class DependabotModule {}
