import { DependencyParserService } from './dependency-parser.service';
import { Dependency } from './types/dependency.type';

export class NodeDependencyParserService implements DependencyParserService {
  // TODO: Fix any.
  parse(data: any): Dependency[] {
    return Object.entries(data.dependencies)
      .concat(Object.entries(data.devDependencies))
      .map(([key, version]) => ({ key, version: version as string }));
  }
}
