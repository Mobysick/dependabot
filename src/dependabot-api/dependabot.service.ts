import { Injectable } from '@nestjs/common';
import { DependabotCheckerService } from './checker.service';
import { RepoCheckReqDto } from './dto/repo-check-req.dto';
import { RepoCheckResDto } from './dto/repo-check-res.dto';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class DependabotService {
  constructor(
    private checkerService: DependabotCheckerService,
    private subscriptionService: SubscriptionService,
  ) {}

  async checkRepo(dto: RepoCheckReqDto) {
    const { repoHost, user, repoName, emails, subscribe } = dto;
    const outdatedDependencies = await this.checkerService.getOutdatedDependencies({
      repoHost,
      user,
      repoName,
    });

    if (subscribe) {
      this.subscriptionService.subscribe({ repoHost, user, repoName, emails });
    }

    return new RepoCheckResDto(outdatedDependencies);
  }
}
