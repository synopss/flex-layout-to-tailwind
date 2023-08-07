#! /usr/bin/env node
import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { Command } from 'commander';
import * as fs from 'fs';
import * as process from 'process';
import { migrate } from './migrator/migrate';

interface ProgramOptions {
  input: string;
}

const handleArguments = async (options: ProgramOptions) => {
  try {
    let input = options.input;

    if (input) {
      await migrate(input);
    } else {
      input = await handlePrompt();
      await migrate(input);
    }
  } catch (error) {
    console.error(chalk.red('Failed to execute the command. Error: '), error);
  }
};

async function handlePrompt(): Promise<string> {
  return await input({ message: 'Enter your project path to migrate' });
}

async function main(): Promise<void> {
  const program = new Command();

  program.version('1.0.0').description('CLI that migrates @angular/flex to tailwindcss');

  program.option('-I, --input <input>', 'input HTML file or folder', value => {
    if (!fs.existsSync(value)) {
      console.error(
        chalk.red(`Error: The input path ${value} does not exist. Please specify a valid file or directory.`),
      );
      process.exit(1);
    }
    return value;
  });

  program.action(handleArguments);

  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error(chalk.red('An error occured: %s', error));
    process.exit(1);
  }
}

console.log(chalk.yellow('\nWelcome to the Angular Flex Layout Migrator!\n'));
console.log(
  chalk.whiteBright('This tool will help you migrate your Angular Flex-Layout attributes to tailwind classes\n'),
);

main();
