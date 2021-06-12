import { HttpApi } from '../../http/http-api';
import { RegistryCheckerService } from './registry-checker.service';

export class PhpRegistryCheckerService extends RegistryCheckerService {
  async getLatestVersion(packageName: string): Promise<string> {
    const url = `https://repo.packagist.org/p2/${packageName}.json`;
    try {
      const response = await HttpApi.get(url);
      const versions = response.data.packages[packageName];
      const latestVersion = versions[0].version;
      return latestVersion || '';
    } catch (error) {}
    return '';
  }
}
