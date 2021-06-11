export interface FileParserService {
  parse(data: string): Promise<Record<string, unknown>>;
}
