import { FileParserService } from './file-parser.service';

export class JsonParserService implements FileParserService {
  parse(data: string): Promise<Record<string, unknown>> {
    return JSON.parse(data);
  }
}
