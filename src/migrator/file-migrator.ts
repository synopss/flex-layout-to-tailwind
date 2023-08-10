import { CheerioAPI } from 'cheerio';
import fs from 'fs';
import { convertFile } from '../converter/converter';
import { loadHtml } from '../util/cheerio';
import { findElementsWithFxAttributes } from '../util/flex-layout';

export function isSupportedFileExtension(fileExtension: string): boolean {
  return fileExtension === '.html' || fileExtension === '.htm';
}

export async function migrateFile(filePath: string): Promise<void> {
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = loadHtml(html);

  const elements = findElementsWithFxAttributes($);
  console.debug(`Found ${elements.length} elements`);

  if (!elements.length) {
    console.debug('No elements found. Skipping file');
    return;
  }

  convertFile($);
  await writeFile($, filePath);
}

async function writeFile($: CheerioAPI, filePath: string): Promise<void> {
  const migratedHtml = $.html({ xmlMode: false });

  await fs.promises.writeFile(filePath, migratedHtml);
}
