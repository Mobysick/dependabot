import { NodeDependencyParserService } from './node-dependency-parser.service';
import { Dependency } from './types/dependency.type';

describe('NodeDependencyParserService', () => {
  describe('parse', () => {
    it('parses package.json-like data correctly', () => {
      const service = new NodeDependencyParserService();
      const data = {
        dependencies: { dep1: '1.0.0', dep2: '1.0.1' },
        devDependencies: { dep3: '1.0.3', dep4: '1.0.4' },
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
