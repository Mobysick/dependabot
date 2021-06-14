import { RegistryCheckerFactory } from '../dependabot-core/registry-checker/registry-checker.factory';
import { OutdatedPackage } from '../dependabot-core/registry-checker/types/outdated-package.type';
import { LanguageOption } from '../dependabot-core/repo-checker/types/language-option.enum';
import { DependabotCheckerService } from './checker.service';

describe('DependabotCheckerService', () => {
  describe('comparePackages', () => {
    it('returns empty array when all packages up to date', () => {
      const service = new DependabotCheckerService();
      const registryChecker = RegistryCheckerFactory.getService(LanguageOption.NODE);
      const dependencyList = [
        { key: 'pac1', version: '1.0.0' },
        { key: 'pac2', version: '2.0.2' },
      ];
      const latestVersions = ['1.0.0', '2.0.2'];
      const outdatedDependencies = service.comparePackages(
        registryChecker,
        dependencyList,
        latestVersions,
      );
      const expectedOutput: OutdatedPackage[] = [];
      expect(outdatedDependencies).toStrictEqual(expectedOutput);
    });

    it('returns empty outdated packages', () => {
      const service = new DependabotCheckerService();
      const registryChecker = RegistryCheckerFactory.getService(LanguageOption.NODE);
      const dependencyList = [
        { key: 'pac1', version: '1.0.0' },
        { key: 'pac2', version: '2.0.2' },
      ];
      const latestVersions = ['1.0.1', '2.4.2'];
      const outdatedDependencies = service.comparePackages(
        registryChecker,
        dependencyList,
        latestVersions,
      );
      const expectedOutput: OutdatedPackage[] = [
        { name: 'pac1', current: '1.0.0', wanted: '1.0.1' },
        { name: 'pac2', current: '2.0.2', wanted: '2.4.2' },
      ];
      expect(outdatedDependencies).toStrictEqual(expectedOutput);
    });
  });
});
