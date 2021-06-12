import { Dependency } from './types/dependency.type';

export interface DependencyParserService {
  // TODO: Fix any.
  parse(data: any): Dependency[];
}
