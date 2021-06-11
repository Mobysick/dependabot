import { DependencyParserService } from '../dependency-parser/dependency-parser.service';
import { LanguageOption } from '../repo-checker/language-option.enum';
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
        throw new Error('Language option not supported');
      }
    }
  }
}
