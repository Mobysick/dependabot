import { LanguageOption } from '../../dependabot-core/repo-checker/types/language-option.enum';
import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
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
        throw new BadRequestError(ApiErrorMessage.LANGUAGE_NOT_SUPPORTED);
      }
    }
  }
}
