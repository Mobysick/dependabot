import { DependencyParserService } from './dependency-parser.service';
import { Dependency } from './dependency.dto';

export class NodeDependencyParserService implements DependencyParserService {
  // TODO: Fix any.
  parse(data: any): Dependency[] {
    const keys = Object.keys(data.dependencies).map((key) => ({
      key,
      version: data.dependencies[key],
    }));
    return keys;
  }
}
