import * as fs from 'fs';
import { loadGitIgnore } from '../util/gitignore';
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
}
