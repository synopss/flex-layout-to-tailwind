import chalk from 'chalk';
import fs from 'fs';
import { createSpinner } from 'nanospinner';
import path from 'path';
import { shouldIgnore } from '../util/gitignore';
import { logger } from '../util/logger';
import { isSupportedFileExtension, migrateFile } from './file-migrator';

let baseFolder: string;

export async function migrateFolder(folderPath: string, isRecursive: boolean = false): Promise<void> {
  if (!isRecursive) {
    baseFolder = folderPath;
  }
  const folderPathBaseName = path.basename(folderPath);
  const spinner = createSpinner(`Migrating 📂: ${chalk.bold(folderPathBaseName)}`).start();

  const filesAndDirectories = await fs.promises.readdir(folderPath);

  filesAndDirectories.forEach(itemPath => {
    const currentPath = path.join(folderPath, itemPath);
    const stats = fs.statSync(currentPath);
    logger.debug(`Processing ${itemPath}`);

    if (shouldIgnore(baseFolder, currentPath)) {
      logger.debug(`Ignoring ${currentPath}`);
      return;
    }

    if (stats.isFile()) {
      if (isSupportedFileExtension(path.extname(currentPath))) {
        migrateFile(currentPath);
      }
    } else if (stats.isDirectory()) {
      migrateFolder(currentPath, true);
    }
  });

  spinner.success({ text: `Migrated 📂: ${chalk.bold(folderPathBaseName)}` });
}
