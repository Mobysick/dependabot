import { LanguageOption } from './language-option.enum';

export type DependencyLanguage = {
  language: LanguageOption;
  dependencyFile: string;
};
