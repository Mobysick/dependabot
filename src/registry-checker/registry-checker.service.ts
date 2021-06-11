export abstract class RegistryCheckerService {
  abstract getLatestVersion(packageName: string): Promise<string>;

  public isOutdated(repoVersion: string, latestVersion: string) {
    const repo = this.formatVersion(repoVersion);
    const latest = this.formatVersion(latestVersion);
    const isWanted = repo === latest;
    if (!isWanted) {
      return { current: repo, wanted: latest };
    }
    return false;
  }

  private formatVersion(version: string): string {
    const operatorsToIgnore = ['~', '^', '=', '<', '>', '*', 'v'];
    return version
      .split('')
      .filter((char) => !operatorsToIgnore.includes(char))
      .join('');
  }
}
