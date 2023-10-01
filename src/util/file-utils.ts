import { readFileSync } from 'fs';
import { JsonParseOptions, parseJson } from './json';

interface JsonReadOptions extends JsonParseOptions {
  /**
   * mutable field recording whether JSON ends with new line
   * @default false
   */
  endsWithNewLine?: boolean;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function readJsonFile<T extends object = any>(path: string, options?: JsonReadOptions): T {
  const content = readFileSync(path, 'utf-8');
  if (options) {
    options.endsWithNewLine = content.charCodeAt(content.length - 1) === 0;
  }

  return parseJson<T>(content, options);
}
