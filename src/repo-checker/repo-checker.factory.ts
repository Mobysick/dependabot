import { CreateRepoCheckerParamsDto } from './create-repo-checker-params.dto';
import { GithubRepoCheckerService } from './github-repo-checker.service';
import { RepoCheckerService } from './repo-checker.service';
import { RepoOption } from './repo.enum';

export class RepoCheckerFactory {
  static getService(repoOption: RepoOption, dto: CreateRepoCheckerParamsDto): RepoCheckerService {
    switch (repoOption) {
      case RepoOption.GITHUB: {
        return new GithubRepoCheckerService(dto);
      }
      default: {
        throw new Error('Repository option not supported');
      }
    }
  }
}
