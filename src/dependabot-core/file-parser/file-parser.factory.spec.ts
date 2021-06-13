import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { LanguageOption } from '../repo-checker/types/language-option.enum';
import { FileParserFactory } from './file-parser.factory';
import { JsonParserService } from './json-parser.service';

describe('FileParserFactory', () => {
  describe('getParser', () => {
    it('returns JsonParser instance for NODE', () => {
      const service = FileParserFactory.getParser(LanguageOption.NODE);
      expect(service).toBeInstanceOf(JsonParserService);
    });

    it('returns JsonParser instance for PHP', () => {
      const service = FileParserFactory.getParser(LanguageOption.PHP);
      expect(service).toBeInstanceOf(JsonParserService);
    });

    it('throws error with unknown language type', () => {
      expect(() => FileParserFactory.getParser('unexsiting lang' as LanguageOption)).toThrow(
        new BadRequestError(ApiErrorMessage.LANGUAGE_NOT_SUPPORTED),
      );
    });
  });
});
