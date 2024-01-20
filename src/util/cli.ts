import { execSync } from 'child_process';
import { readJsonFile } from './file-utils';
import { logger } from './logger';
import { getPackageManagerCommand, PackageManagerCommands } from './package-manager';
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

export function getLatestVersion(packageName: string): string {
  return execSync(`npm view ${packageName} version`, { encoding: 'utf-8' }).trim();
}

export function runInstall(
  root: string,
  forceInstall: boolean,
  pmc: PackageManagerCommands = getPackageManagerCommand(),
) {
  if (!forceInstall) execSync(pmc.install, { stdio: [0, 1, 2], cwd: root });
  else execSync(pmc.forceInstall, { stdio: [0, 1, 2], cwd: root });
}
