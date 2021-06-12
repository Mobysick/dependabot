import { LanguageOption } from '../../dependabot-core/repo-checker/types/language-option.enum';
import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { FileParserService } from './file-parser.service';
import { JsonParserService } from './json-parser.service';

export class FileParserFactory {
  static getParser(langOption: LanguageOption): FileParserService {
    switch (langOption) {
      case LanguageOption.NODE: {
        return new JsonParserService();
      }
      case LanguageOption.PHP: {
        return new JsonParserService();
      }
      default: {
        throw new BadRequestError(ApiErrorMessage.LANGUAGE_NOT_SUPPORTED);
      }
    }
  }
}
