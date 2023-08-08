import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import process from 'process';
import { convertFlexLayoutToTailwind } from '../converter/converter';

export async function migrate(inputPath: string): Promise<void> {
  let stat: fs.Stats;

  try {
    stat = await fs.promises.stat(inputPath);
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }

  if (stat.isFile()) {
    if (!isSupportedFileExtension(path.extname(inputPath))) {
      console.error(`Error: Unsupported file type: ${inputPath}`);
      process.exit(1);
    }
    convertFile(inputPath);
  } else if (stat.isDirectory()) {
    convertDirectory(inputPath);
  }

  console.log(chalk.green('Migration done.'));
}

function convertFile(filePath: string): void {
  const convertedData = convertFlexLayoutToTailwind(filePath);
  fs.writeFileSync(filePath, convertedData, 'utf-8');
  console.info(`Info: File converted successfully: ${filePath}`);
}

function convertDirectory(folderPath: string): void {
  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isFile()) {
      if (isSupportedFileExtension(path.extname(fullPath))) {
        convertFile(fullPath);
      }
    } else if (stats.isDirectory() && isFolderToMigrate(fullPath)) {
      convertDirectory(fullPath);
    }
  });
}

function isSupportedFileExtension(fileExtension: string): boolean {
  return fileExtension === '.html' || fileExtension === '.htm';
}

function isFolderToMigrate(folderPath: string): boolean {
  return folderPath.endsWith('node_modules') || folderPath.endsWith('dist');
}
