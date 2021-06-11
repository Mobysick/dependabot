import { Injectable } from '@nestjs/common';
import { RepoCheckReqDto } from './dto/repo-check-req.dto';
import { RepoCheckResDto } from './dto/repo-check-res-dto';
import { RepoCheckerService } from '../repo-checker/repo-checker.service';
import { GithubRepoCheckerService } from '../repo-checker/github-repo-checker.service';

@Injectable()
export class DependabotService {
  async checkRepo(dto: RepoCheckReqDto) {
    console.log('dto', dto);

    const repoCheckerService: RepoCheckerService = new GithubRepoCheckerService({
      user: dto.user,
      repo: dto.repo,
    });

    await repoCheckerService.parseDependencies();

    return new RepoCheckResDto();
  }
}
