import { LanguageOption } from './language-option.enum';
export interface Language {
  language: LanguageOption;
  dependencyFile: string;
}
