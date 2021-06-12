import { DependencyParserService } from './dependency-parser.service';
import { Dependency } from './types/dependency.type';

export class PhpDependencyParserService implements DependencyParserService {
  // TODO: Fix any.
  parse(data: any): Dependency[] {
    return Object.keys(data.require).map((key) => ({ key, version: data.require[key] }));
  }
}
