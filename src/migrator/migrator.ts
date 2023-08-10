import chalk from 'chalk';
import * as fs from 'fs';
import { loadGitIgnore } from '../util/gitignore';
import { logger } from '../util/logger';
import { migrateFile } from './file-migrator';
import { migrateFolder } from './folder-migrator';

export async function migrate(inputPath: string): Promise<void> {
  const stat: fs.Stats = await fs.promises.stat(inputPath);

  await loadGitIgnore(inputPath);

  if (stat.isFile()) {
    await migrateFile(inputPath);
  } else if (stat.isDirectory()) {
    await migrateFolder(inputPath);
  }

  logger.bold("\nMigration is close to be over. Here is what's left for you to do:");
  logger.step('install tailwind (https://tailwindcss.com/docs/guides/angular)');
  logger.step(`manually migrate your bound directives (${chalk.bold('[')}fxFlex${chalk.bold(']')}, etc.)\n`);
  logger.bold('Thank you for using this migration CLI! 🎉');
}
