import fs from 'fs';
import { dirname } from 'path';
import { JsonParseOptions, JsonSerializeOptions, parseJson, serializeJson } from './json';

interface JsonReadOptions extends JsonParseOptions {
  /**
   * mutable field recording whether JSON ends with new line
   * @default false
   */
  endsWithNewLine?: boolean;
}

interface JsonWriteOptions extends JsonSerializeOptions {
  /**
   * whether to append new line at the end of JSON file
   * @default false
   */
  appendNewLine?: boolean;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function readJsonFile<T extends object = any>(path: string, options?: JsonReadOptions): T {
  const content = fs.readFileSync(path, 'utf-8');
  if (options) {
    options.endsWithNewLine = content.charCodeAt(content.length - 1) === 0;
  }

  return parseJson<T>(content, options);
}

export function writeJsonFile<T extends object = object>(path: string, data: T, options?: JsonWriteOptions): void {
  fs.mkdirSync(dirname(path), { recursive: true });
  const serializedJson = serializeJson(data, options);
  const content = options?.appendNewLine ? `${serializedJson}\n` : serializedJson;
  fs.writeFileSync(path, content, { encoding: 'utf-8' });
}

export function unshiftFile(path: string, value: string) {
  const data = fs.readFileSync(path).toString().split('\n');
  data.splice(0, 0, value);
  const content = data.join('\n');

  fs.writeFileSync(path, content);
}
