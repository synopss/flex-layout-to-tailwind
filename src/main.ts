#! /usr/bin/env node
import { confirm, input } from '@inquirer/prompts';
import chalk from 'chalk';
import { Command } from 'commander';
import * as fs from 'fs';
import * as process from 'process';
import { migrate } from './migrator/migrator';
import { ATTRIBUTES_HANDLED } from './util/flex-layout';
import { logger, setDebugMode } from './util/logger';

interface ProgramOptions {
  input: string;
  debug: boolean;
}

const handleArguments = async (options: ProgramOptions) => {
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
  } catch (error) {
    logger.error(`Failed to execute the command. ${error}`);
  }
};

async function handleInputPrompt(): Promise<string> {
  return input({ message: 'Enter your project path to migrate' });
}

async function handleDebugPrompt(): Promise<boolean> {
  return confirm({ message: 'Do you want to use DEBUG mode ?' });
}

async function main(): Promise<void> {
  const program = new Command();

  program.version('1.0.0').description('CLI that migrates @angular/flex to tailwindcss');

  program.option('-I, --input <input>', 'input HTML file or folder', value => {
    if (!fs.existsSync(value)) {
      logger.error(`The input path ${value} does not exist. Please specify a valid file or directory.`);
      process.exit(1);
    }
    return value;
  });

  program.option('-D, --debug', 'enter debug mode', () => {
    setDebugMode();
  });

  program.action(handleArguments);

  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    logger.error(`An error occurred: ${error}`);
    process.exit(1);
  }
}

logger.yellow('Welcome to the Angular Flex Layout Migrator!\n');
logger.bold('This tool will help you migrate your Angular Flex-Layout attributes to tailwind classes\n');
logger.step(`${ATTRIBUTES_HANDLED} are all attributes that will be migrated`);
logger.step(
  `Binded attributes (${chalk.bold('[')}fxFlex${chalk.bold(']')}, etc.) are ${chalk.bold(
    'not supported',
  )} by this migrator\n`,
);

main();
