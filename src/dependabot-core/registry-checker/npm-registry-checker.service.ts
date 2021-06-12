import axios from 'axios';
import { RegistryCheckerService } from './registry-checker.service';

export class NpmRegistryCheckerService extends RegistryCheckerService {
  async getLatestVersion(packageName: string): Promise<string> {
    const url = `https://registry.npmjs.org/${packageName}`;
    let latestVersion: string | undefined;
    try {
      const response = await axios.get(url);
      const versions = Object.keys(response.data.time);
      latestVersion = versions.pop();
      return latestVersion || '';
    } catch (error) {}
    return '';
  }
}
