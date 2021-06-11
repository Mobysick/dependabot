import { DependencyParserService } from './dependency-parser.service';
import { Dependency } from './dependency.dto';

export class PhpDependencyParserService implements DependencyParserService {
  // TODO: Singleton?

  parse(data: any): Dependency[] {
    return Object.keys(data.require).map((key) => ({ key, version: data.require[key] }));
  }
}
