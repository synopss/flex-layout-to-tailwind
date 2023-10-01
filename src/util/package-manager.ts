import fs from 'fs';
import path from 'path';

export type PackageManager = 'yarn' | 'pnpm' | 'npm';

export interface PackageManagerCommands {
  install: string;
}

export function getPackageManagerCommand(
  packageManager: PackageManager = detectPackageManager(),
): PackageManagerCommands {
  const commands: { [pm in PackageManager]: () => PackageManagerCommands } = {
    yarn: () => {
      return {
        install: 'yarn',
      };
    },
    pnpm: () => {
      return {
        install: 'pnpm install',
      };
    },
    npm: () => {
      return {
        install: 'npm install',
      };
    },
  };

  return commands[packageManager]();
}

function detectPackageManager(dir: string = ''): PackageManager {
  if (fs.existsSync(path.join(dir, 'yarn.lock'))) {
    return 'yarn';
  }
  if (fs.existsSync(path.join(dir, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  return 'npm';
}
