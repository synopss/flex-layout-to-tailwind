import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import * as process from 'process';
import { migrate } from '../migrator/migrator';
import { logger, setDebugMode } from '../util/logger';
import { updateDependencies } from './dependencies-update';
import { setupTailwind } from './setup-tailwind';

interface ProgramOptions {
  input: string;
  debug: boolean;
  tailwindConfigExtension: 'js' | 'ts' | 'cjs';
}

export const handleArguments = async (options: ProgramOptions) => {
  try {
    let input = options.input;
    const debug = options.debug;

    if (debug) {
      setDebugMode();
    }

    const isNxProject = fs.existsSync(path.join(input, 'nx.json'));
    if (!isNxProject) {
      logger.bold('\n📦 Installing dependencies\n');

      updateDependencies(input);

      await setupTailwind(input);
    } else {
      logger.warning(
        'Nx is not supported yet, but flex-layout directives will still be replaced by tailwindcss classes. \n ' +
          'Please read to help you finish the migration: https://blog.nrwl.io/set-up-tailwind-css-with-angular-in-an-nx-workspace-6f039a0f4479',
      );
    }

    if (input) {
      await migrate(input);
    } else {
      input = await handleInputPrompt();
      await migrate(input);
    }

    logger.bold("\nMigration is close to be over. Here is what's left for you to do:");
    logger.step(`manually migrate your binded directives (${chalk.bold('[')}fxFlex${chalk.bold(']')}, etc.)`);
    logger.bold('\nThank you for using this migration CLI! 🎉');
  } catch (error) {
    logger.error(`\nFailed to execute the command. ${error}`);
    process.exit(1);
  }
};

async function handleInputPrompt(): Promise<string> {
  return input({ message: 'Enter your project path to migrate' });
}
