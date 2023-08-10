import chalk from 'chalk';
import { CheerioAPI } from 'cheerio';
import fs from 'fs';
import { createSpinner } from 'nanospinner';
import path from 'path';
import { convertFile } from '../converter/converter';
import { loadHtml } from '../util/cheerio';
import { findElementsWithFxAttributes } from '../util/flex-layout';
import { logger } from '../util/logger';

export function isSupportedFileExtension(fileExtension: string): boolean {
  return fileExtension === '.html' || fileExtension === '.htm';
}

export async function migrateFile(filePath: string): Promise<void> {
  const filePathBaseName = path.basename(filePath);
  const spinner = createSpinner(`Migrating 📄: ${chalk.bold(filePathBaseName)}`).start();

  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = loadHtml(html);

  const elements = findElementsWithFxAttributes($);
  logger.debug(`Found ${elements.length} elements`);

  if (!elements.length) {
    logger.debug('No directives found. Skipping file');
    spinner.error({ text: `No directives found to migrate: ${chalk.bold(path.basename(filePath))}` });
    return;
  }

  convertFile($);
  await writeFile($, filePath);
  spinner.success({ text: `Migrated 📄: ${chalk.bold(filePathBaseName)}` });
}

async function writeFile($: CheerioAPI, filePath: string): Promise<void> {
  const migratedHtml = $.html({ xmlMode: false });

  await fs.promises.writeFile(filePath, migratedHtml);
}
