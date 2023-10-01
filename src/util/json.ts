import { parse, ParseError, ParseOptions, printParseErrorCode } from 'jsonc-parser';
import { LinesAndColumns } from 'lines-and-columns';

export interface JsonParseOptions extends ParseOptions {
  /**
   * Expect JSON with javascript-style
   * @default false
   */
  expectComments?: boolean;
  /**
   * Disallow javascript-style
   * @default false
   */
  disallowComments?: boolean;

  /**
   * Allow trailing commas in the JSON content
   */
  allowTrailingComma?: boolean;
}

export interface JsonSerializeOptions {
  /**
   * the whitespaces to add as indentation to make the output more readable.
   * @default 2
   */
  spaces?: number;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function parseJson<T extends object = any>(input: string, options?: JsonParseOptions): T {
  try {
    return JSON.parse(input);
  } catch {
    // ignore
  }

  options = { allowTrailingComma: true, ...options };

  const errors: ParseError[] = [];
  const result: T = parse(input, errors, options);

  if (errors.length > 0) {
    throw new Error(formatParseError(input, errors[0]));
  }

  return result;
}

function formatParseError(input: string, parseError: ParseError) {
  const { error, offset } = parseError;
  let { line, column } = new LinesAndColumns(input).locationForIndex(offset)!;
  line++;
  column++;

  return `${printParseErrorCode(error)} in JSON at ${line}:${column}\n`;
}

export function serializeJson<T extends object = object>(input: T, options?: JsonSerializeOptions): string {
  return JSON.stringify(input, null, options?.spaces ?? 2) + '\n';
}
