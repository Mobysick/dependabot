import { Dependency } from './dependency.dto';

export interface DependencyParserService {
  parse(data: any): Dependency[];
}
