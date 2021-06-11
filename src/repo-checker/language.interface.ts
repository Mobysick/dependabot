import { RegistryCheckerService } from 'src/registry-checker/registry-checker.service';
import { DependencyParserService } from '../dependency-parser/dependency-parser.service';
import { FileParserService } from '../file-parser/file-parser.service';

export interface Language {
  language: string;
  dependencyFile: string;
  fileParser: FileParserService;
  dependencyParser: DependencyParserService;
  registryChecker: RegistryCheckerService;
}
