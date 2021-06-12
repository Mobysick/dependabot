import { Dependency } from '../../../dist/dependency-parser/dependency.dto';
import { PhpDependencyParserService } from './php-dependency-parser.service';

describe('PhpDependencyParserService', () => {
  describe('parse', () => {
    it('parses composer.json-like data correctly', () => {
      const service = new PhpDependencyParserService();
      const data = {
        require: { dep1: '1.0.0', dep2: '1.0.1' },
        'require-dev': { dep3: '1.0.3', dep4: '1.0.4' },
      };
      const expectedDependencies: Dependency[] = [
        { key: 'dep1', version: '1.0.0' },
        { key: 'dep2', version: '1.0.1' },
        { key: 'dep3', version: '1.0.3' },
        { key: 'dep4', version: '1.0.4' },
      ];
      expect(service.parse(data)).toEqual(expectedDependencies);
    });
  });
});
