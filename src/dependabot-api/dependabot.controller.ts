import { Body, Controller, Post } from '@nestjs/common';
import { DependabotService } from './dependabot.service';
import { RepoCheckReqDto } from './dto/repo-check-req.dto';
import { RepoCheckResDto } from './dto/repo-check-res-dto';

@Controller('repo-check')
export class DependabotController {
  constructor(private readonly dependabotService: DependabotService) {}

  @Post()
  async checkRepo(@Body() dto: RepoCheckReqDto): Promise<RepoCheckResDto> {
    return this.dependabotService.checkRepo(dto);
  }
}
