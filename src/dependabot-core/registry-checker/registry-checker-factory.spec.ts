import { ApiErrorMessage } from '../../error/api-error-message';
import { BadRequestError } from '../../error/exceptions/bad-request.error';
import { LanguageOption } from '../repo-checker/types/language-option.enum';
import { RegistryCheckerFactory } from './registry-checker.factory';
import { NpmRegistryCheckerService } from './npm-registry-checker.service';
import { PhpRegistryCheckerService } from './php-registry-checker.service';

describe('RegistryCheckerFactory', () => {
  describe('getService', () => {
    it('returns NpmRegistryChecker instance for NODE', () => {
      const service = RegistryCheckerFactory.getService(LanguageOption.NODE);
      expect(service).toBeInstanceOf(NpmRegistryCheckerService);
    });

    it('returns PhpRegistryChecker instance for PHP', () => {
      const service = RegistryCheckerFactory.getService(LanguageOption.PHP);
      expect(service).toBeInstanceOf(PhpRegistryCheckerService);
    });

    it('throws error with unknown language type', () => {
      expect(() => RegistryCheckerFactory.getService('bla bla lang' as LanguageOption)).toThrow(
        new BadRequestError(ApiErrorMessage.LANGUAGE_NOT_SUPPORTED),
      );
    });
  });
});
