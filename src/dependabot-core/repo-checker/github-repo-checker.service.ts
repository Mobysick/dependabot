import { Injectable } from '@nestjs/common';
import { RepoCheckerService } from './repo-checker.service';
import { CreateRepoCheckerParams } from './types/create-repo-checker-params.type';

Injectable();
export class GithubRepoCheckerService extends RepoCheckerService {
  constructor(dto: CreateRepoCheckerParams) {
    super(dto);
  }

  getRepoUrl(): string {
    return `https://api.github.com/repos/${this.user}/${this.repo}`;
  }

  getPackageFileUrl(fileName: string): string {
    return `https://api.github.com/repos/${this.user}/${this.repo}/contents/${fileName}`;
  }
}
