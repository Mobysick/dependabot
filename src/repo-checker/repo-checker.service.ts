import axios from 'axios';
import { FileParserFactory } from 'src/file-parser/file-parser.factory';
import { DependencyParserFactory } from '../dependency-parser/dependency-parser.factory';
import { CreateRepoCheckerParamsDto } from './create-repo-checker-params.dto';
import { ParseDependenciesResultDto } from './dto/parse-dependencies-result.dto';
import { LanguageOption } from './language-option.enum';
import { Language } from './language.interface';

export abstract class RepoCheckerService {
  protected readonly languageOptions: Language[] = [
    {
      language: LanguageOption.NODE,
      dependencyFile: 'package.json',
    },
    {
      language: LanguageOption.PHP,
      dependencyFile: 'composer.json',
    },
  ];

  protected baseUrl: string;

  constructor(dto: CreateRepoCheckerParamsDto) {
    this.baseUrl = this.getBaseUrl(dto);
  }

  protected abstract getBaseUrl(dto: CreateRepoCheckerParamsDto): string;

  async parseDependencies(): Promise<ParseDependenciesResultDto> {
    for (const langOption of this.languageOptions) {
      const url = this.baseUrl + langOption.dependencyFile;
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const fileParser = FileParserFactory.getParser(langOption.language);
          const dependencyParser = DependencyParserFactory.getParser(langOption.language);

          const content = await fileParser.parse(
            Buffer.from(response.data.content, response.data.encoding).toString(),
          );
          const dependencyList = dependencyParser.parse(content);

          return new ParseDependenciesResultDto(langOption.language, dependencyList);
        }
      } catch (error) {}
    }

    throw new Error('Not found');
  }
}
