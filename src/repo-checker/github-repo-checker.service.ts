import { Injectable } from '@nestjs/common';
import { RepoCheckerService } from './repo-checker.service';
import { CreateRepoCheckerParamsDto } from './create-repo-checker-params.dto';

Injectable();
export class GithubRepoCheckerService extends RepoCheckerService {
  constructor(dto: CreateRepoCheckerParamsDto) {
    super(dto);
  }

  getBaseUrl(dto: CreateRepoCheckerParamsDto): string {
    return `https://api.github.com/repos/${dto.user}/${dto.repo}/contents/`;
  }
}
