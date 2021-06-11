import { LanguageOption } from '../repo-checker/language-option.enum';
import { NpmRegistryCheckerService } from './npm-registry-checker.service';
import { PhpRegistryCheckerService } from './php-registry-checker.service';
import { RegistryCheckerService } from './registry-checker.service';

export class RegistryCheckerFactory {
  static getService(langOption: LanguageOption): RegistryCheckerService {
    switch (langOption) {
      case LanguageOption.NODE: {
        return new NpmRegistryCheckerService();
      }
      case LanguageOption.PHP: {
        return new PhpRegistryCheckerService();
      }
      default: {
        throw new Error('Language option not supported');
      }
    }
  }
}
