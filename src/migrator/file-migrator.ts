import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { convertFlexLayoutToTailwind } from '../converter/converter';

export function migrateFile(filePath: string): void {
  if (!isSupportedFileExtension(path.extname(filePath))) {
    console.error(chalk.red(`Error: Unsupported file type: ${filePath}`));
    process.exit(1);
  }

  const convertedData = convertFlexLayoutToTailwind(filePath);
  fs.writeFileSync(filePath, convertedData, 'utf-8');
  console.info(`Info: File converted successfully: ${filePath}`);
}

export function isSupportedFileExtension(fileExtension: string): boolean {
  return fileExtension === '.html' || fileExtension === '.htm';
}
