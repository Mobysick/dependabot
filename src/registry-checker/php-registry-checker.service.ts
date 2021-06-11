import axios from 'axios';
import { RegistryCheckerService } from './registry-checker.service';

export class PhpRegistryCheckerService extends RegistryCheckerService {
  async getLatestVersion(packageName: string): Promise<string> {
    const url = `https://repo.packagist.org/p2/${packageName}.json`;
    let latestVersion: string | undefined;
    try {
      const response = await axios.get(url);
      const versions = response.data.packages[packageName];
      latestVersion = versions[0].version;
      return latestVersion || '';
    } catch (error) {
      //   console.log('error', error);
    }
    return '';
  }
}
