import { Module } from '@nestjs/common';
import { DependabotModule } from './dependabot-api/dependabot.module';

@Module({
  imports: [DependabotModule],
})
export class AppModule {}
