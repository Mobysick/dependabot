import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { LanguageOption } from '../repo-checker/types/language-option.enum';
import { DependencyParserFactory } from './dependency-parser.factory';
import { NodeDependencyParserService } from './node-dependency-parser.service';
import { PhpDependencyParserService } from './php-dependency-parser.service';

describe('DependencyParserFactory', () => {
  describe('getParser', () => {
    it('returns NodeDependencyParser instance for NODE', () => {
      const service = DependencyParserFactory.getParser(LanguageOption.NODE);
      expect(service).toBeInstanceOf(NodeDependencyParserService);
    });

    it('returns PhpDependencyParserService instance for PHP', () => {
      const service = DependencyParserFactory.getParser(LanguageOption.PHP);
      expect(service).toBeInstanceOf(PhpDependencyParserService);
    });

    it('throws error with unknown language type', () => {
      expect(() => DependencyParserFactory.getParser('bla bla lang' as LanguageOption)).toThrow(
        new BadRequestError(ApiErrorMessage.LANGUAGE_NOT_SUPPORTED),
      );
    });
  });
});
