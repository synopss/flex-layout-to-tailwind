import { getLatestVersion, runInstall } from '../util/cli';
import { readJsonFile, writeJsonFile } from '../util/file-utils';
import { joinPathFragments } from '../util/path';

const packagesToInstall = ['tailwindcss', 'postcss', 'autoprefixer'];
const packagesToUninstall = ['@angular/flex-layout'];

export function updateDependencies(root: string, forceInstall: boolean = false): void {
  updatePackageJson(root);
  runInstall(root, forceInstall);
  console.log('\n');
}

function updatePackageJson(root: string) {
  const path = joinPathFragments(root, 'package.json');
  const json = readJsonFile(path);
  if (!json.devDependencies) {
    json.devDependencies = {};
  }

  packagesToInstall.forEach(packageName => {
    json.devDependencies[packageName] = getLatestVersion(packageName);
  });
  packagesToUninstall.forEach(packageName => {
    delete json.dependencies[packageName];
    delete json.devDependencies[packageName];
  });

  json.devDependencies = sortObjectByKeys(json.devDependencies);

  writeJsonFile(path, json);
}

function sortObjectByKeys<T>(obj: T): T {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }
  return Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .reduce((result, key) => {
      return {
        ...result,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [key]: obj[key],
      };
    }, {}) as T;
}
