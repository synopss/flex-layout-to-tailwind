import { readJsonFile } from './file-utils';
import { logger } from './logger';
import { joinPathFragments } from './path';

export function readPackageVersion(root: string, packageName: string): string | undefined {
  const path = joinPathFragments(root, 'package.json');
  const json = readJsonFile(path);
  if (!json.devDependencies) {
    logger.debug(`The package ${packageName} is not installed`);
    return;
  }
  return json.devDependencies[packageName] as string;
}
