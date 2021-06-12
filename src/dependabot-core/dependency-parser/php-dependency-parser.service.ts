import { DependencyParserService } from './dependency-parser.service';
import { Dependency } from './types/dependency.type';

export class PhpDependencyParserService implements DependencyParserService {
  // TODO: Fix any.
  parse(data: any): Dependency[] {
    const keys = Object.keys(data.require).map((key) => ({ key, version: data.require[key] }));
    return keys.concat(
      Object.keys(data['require-dev']).map((key) => ({
        key,
        version: data['require-dev'][key],
      })),
    );
  }
}
