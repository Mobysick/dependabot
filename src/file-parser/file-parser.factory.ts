import { FileParserService } from '../file-parser/file-parser.service';
import { LanguageOption } from '../repo-checker/language-option.enum';
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
        throw new Error('Language option not supported');
      }
    }
  }
}
