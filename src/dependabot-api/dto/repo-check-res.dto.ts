import { OutdatedPackage } from '../../dependabot-core/registry-checker/types/outdated-package.type';

export enum RepoStatus {
  OUTDATED = 'OUTDATED',
  UP_TO_DATE = 'UP_TO_DATE',
}

export class RepoCheckResDto {
  status: RepoStatus;
  outDatedPackages: OutdatedPackage[];

  constructor(outDatedPackages: OutdatedPackage[]) {
    if (outDatedPackages.length) {
      this.status = RepoStatus.OUTDATED;
    } else {
      this.status = RepoStatus.UP_TO_DATE;
    }
    this.outDatedPackages = outDatedPackages;
  }
}
