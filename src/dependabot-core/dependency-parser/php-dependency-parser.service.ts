import { DependencyParserService } from './dependency-parser.service';
import { Dependency } from './types/dependency.type';

export class PhpDependencyParserService implements DependencyParserService {
  // TODO: Fix any.
  parse(data: any): Dependency[] {
    return Object.entries(data.require)
      .concat(Object.entries(data['require-dev']))
      .map(([key, version]) => ({ key, version: version as string }));
  }
}
