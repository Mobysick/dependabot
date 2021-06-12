import { JsonParserService } from './json-parser.service';

describe('JsonParserService', () => {
  describe('parse', () => {
    it('parses json correctly', () => {
      const service = new JsonParserService();
      const testObject = { dependencies: { dep1: 'v1', dep2: 'v2' } };
      expect(service.parse(JSON.stringify(testObject))).toStrictEqual(testObject);
    });
  });
});
