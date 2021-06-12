import { DependencyParserService } from './dependency-parser.service';
import { Dependency } from './types/dependency.type';

export class NodeDependencyParserService implements DependencyParserService {
  // TODO: Fix any.
  parse(data: any): Dependency[] {
    const keys = Object.keys(data.dependencies).map((key) => ({
      key,
      version: data.dependencies[key],
    }));
    return keys.concat(
      Object.keys(data.devDependencies).map((key) => ({
        key,
        version: data.devDependencies[key],
      })),
    );
  }
}
