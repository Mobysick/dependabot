import { HttpApi } from '../../http/http-api';
import { RegistryCheckerService } from './registry-checker.service';

export class NpmRegistryCheckerService extends RegistryCheckerService {
  async getLatestVersion(packageName: string): Promise<string> {
    const url = `https://registry.npmjs.org/${packageName}`;
    try {
      const response = await HttpApi.get(url);
      const versions = Object.keys(response.data.time);
      const latestVersion = versions.pop();
      return latestVersion || '';
    } catch (error) {}
    return '';
  }
}
