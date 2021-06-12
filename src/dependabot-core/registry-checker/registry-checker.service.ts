import { ComparedPackage } from './types/compared-package.type';

export abstract class RegistryCheckerService {
  abstract getLatestVersion(packageName: string): Promise<string>;

  public isOutdated(repoVersion: string, latestVersion: string): ComparedPackage | false {
    const repo = this.formatVersion(repoVersion);
    const latest = this.formatVersion(latestVersion);
    const isWanted = repo === latest;
    if (!isWanted) {
      return { current: repo, wanted: latest };
    }
    return false;
  }

  private formatVersion(version: string): string {
    // TODO: Review rules.
    // const operatorsToIgnore = ['~', '^', '=', '<', '>', '*', 'v'];
    const operatorsToIgnore = ['^', '=', '>', 'v'];
    return version
      .split('')
      .filter((char) => !operatorsToIgnore.includes(char))
      .join('');
  }
}
