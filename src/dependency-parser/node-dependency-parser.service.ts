import { DependencyParserService } from './dependency-parser.service';
import { Dependency } from './dependency.dto';

export class NodeDependencyParserService implements DependencyParserService {
  // TODO: Singleton?

  parse(data: any): Dependency[] {
    return Object.keys(data.dependencies).map((key) => ({
      key,
      version: data.dependencies[key],
    }));
  }
}
