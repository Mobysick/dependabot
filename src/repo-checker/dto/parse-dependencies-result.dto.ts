import { Dependency } from '../../dependency-parser/dependency.dto';
import { LanguageOption } from '../language-option.enum';

export class ParseDependenciesResultDto {
  language: LanguageOption;
  dependencies: Dependency[];

  constructor(language: LanguageOption, dependencies: Dependency[]) {
    this.language = language;
    this.dependencies = dependencies;
  }
}
