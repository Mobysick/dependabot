import { LanguageOption } from './language-option.enum';

export type FetchedDependencyContent = {
  language: LanguageOption;
  content?: string;
};
