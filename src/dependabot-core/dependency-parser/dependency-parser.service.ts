import { Dependency } from './dependency.dto';

export interface DependencyParserService {
  // TODO: Fix any.
  parse(data: any): Dependency[];
}
