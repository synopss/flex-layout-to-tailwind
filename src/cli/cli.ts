import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';
import * as process from 'process';
import { migrate } from '../migrator/migrator';
import { logger, setDebugMode } from '../util/logger';
import { updateDependencies } from './dependencies-update';
import { tailwindInstall } from './tailwind-install';

interface ProgramOptions {
  input: string;
  debug: boolean;
  tailwindConfigExtension: 'js' | 'ts' | 'cjs';
}

export const handleArguments = async (options: ProgramOptions) => {
  try {
    let input = options.input;
    let debug = options.debug;

    if (!debug) {
      debug = await handleDebugPrompt();
      if (debug) {
        setDebugMode();
      }
    }

    if (input) {
      await migrate(input);
    } else {
      input = await handleInputPrompt();
      await migrate(input);
    }

    logger.bold('\n📦 Installing dependencies\n');
    updateDependencies(input);

    await tailwindInstall(input);

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

async function handleDebugPrompt(): Promise<boolean> {
  return confirm({ message: 'Do you want to use DEBUG mode ?' });
}
