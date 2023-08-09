import { pathExists, readFile } from 'fs-extra';
import ignore, { Ignore } from 'ignore';
import * as path from 'path';

let gitignoreCache: Ignore | undefined;

export async function loadGitIgnore(folderPath: string): Promise<void> {
  if (gitignoreCache) {
    return;
  }

  const gitignorePath = path.join(folderPath, '.gitignore');
  gitignoreCache = ignore();

  gitignoreCache.add('.git');

  if (await pathExists(gitignorePath)) {
    const content = await readFile(gitignorePath, 'utf-8');
    gitignoreCache.add(content);
    console.debug(`Loaded .gitignore file from ${gitignorePath}`);
  }
}

export function shouldIgnore(folderPath: string, currentPath: string): boolean {
  if (!gitignoreCache) {
    return false;
  }
  const relativePath = path.relative(folderPath, currentPath);
  return gitignoreCache.ignores(relativePath);
}
