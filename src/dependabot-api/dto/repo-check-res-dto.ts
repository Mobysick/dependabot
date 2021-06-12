import { OutdatedPackageDto } from '../../dependabot-core/registry-checker/dto/outdated-package.dto';

export enum RepoStatus {
  OUTDATED = 'OUTDATED',
  UP_TO_DATE = 'UP_TO_DATE',
}

export class RepoCheckResDto {
  status: RepoStatus;
  outDatedPackages: OutdatedPackageDto[];

  constructor(outDatedPackages: OutdatedPackageDto[]) {
    if (outDatedPackages.length) {
      this.status = RepoStatus.OUTDATED;
    } else {
      this.status = RepoStatus.UP_TO_DATE;
    }
    this.outDatedPackages = outDatedPackages;
  }
}
