import { LanguageOption } from '../../dependabot-core/repo-checker/types/language-option.enum';
import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { DependencyParserService } from './dependency-parser.service';
import { NodeDependencyParserService } from './node-dependency-parser.service';
import { PhpDependencyParserService } from './php-dependency-parser.service';

export class DependencyParserFactory {
  static getParser(langOption: LanguageOption): DependencyParserService {
    switch (langOption) {
      case LanguageOption.NODE: {
        return new NodeDependencyParserService();
      }
      case LanguageOption.PHP: {
        return new PhpDependencyParserService();
      }
      default: {
        throw new BadRequestError(ApiErrorMessage.LANGUAGE_NOT_SUPPORTED);
      }
    }
  }
}
