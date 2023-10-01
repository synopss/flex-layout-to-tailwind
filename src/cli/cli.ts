import { confirm, input, select } from '@inquirer/prompts';
import chalk from 'chalk';
import fs from 'fs';
import { createSpinner } from 'nanospinner';
import path from 'path';
import semver from 'semver/preload';
import { migrate } from '../migrator/migrator';
import { readPackageVersion } from '../util/cli';
import { logger, setDebugMode } from '../util/logger';

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

    const tailwindConfigLocation =
      path.resolve(`${input}/tailwind.config.js`) ||
      path.resolve(`${input}/tailwind.config.ts`) ||
      path.resolve(`${input}/tailwind.config.cjs`);

    if (!fs.existsSync(tailwindConfigLocation)) {
      const tailwindConfigFileExtension = await handleTailwindConfigFile(input);
      const tailwindConfigFilePath = `tailwind.config.${tailwindConfigFileExtension}`;

      const spinner = createSpinner(`Creating 📄: ${chalk.bold(tailwindConfigFilePath)}`).start();

      const stubContentsFile = fs.readFileSync(path.resolve(__dirname, '../stubs/config.js'), 'utf-8');
      let stubFile = fs.readFileSync(path.resolve(__dirname, `../stubs/${tailwindConfigFilePath}`), 'utf-8');

      stubFile = stubFile.replace('__CONFIG__', stubContentsFile.replace('module.exports =', '').trim()).trim() + '\n';

      fs.writeFileSync(`${input}/${tailwindConfigFilePath}`, stubFile, 'utf-8');

      spinner.success({ text: `Created 📄: ${chalk.bold(tailwindConfigFilePath)}` });
    }

    logger.bold("\nMigration is close to be over. Here is what's left for you to do:");
    logger.step('install tailwind (https://tailwindcss.com/docs/guides/angular)');
    logger.step(`manually migrate your binded directives (${chalk.bold('[')}fxFlex${chalk.bold(']')}, etc.)`);
    logger.step('uninstall angular/flex-layout package\n');
    logger.bold('Thank you for using this migration CLI! 🎉');
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

async function handleTailwindConfigFile(input: string): Promise<'js' | 'ts' | 'cjs'> {
  const typescript = readPackageVersion(input, 'typescript');
  if (!typescript || !semver.satisfies('4.9.0', typescript)) {
    return select({
      message: 'We will create a tailwind config file for you. What extension do you wish it?',
      choices: [
        {
          name: 'js',
          value: 'js',
          description: 'Javascript',
        },
        {
          name: 'cjs',
          value: 'cjs',
          description: 'CommonJS',
        },
      ],
    });
  }

  return select({
    message: 'We will create a tailwind config file for you. What extension do you wish it?',
    choices: [
      {
        name: 'js',
        value: 'js',
        description: 'Javascript',
      },
      {
        name: 'ts >= 4.9',
        value: 'ts',
        description: 'Typescript >= 4.9',
      },
      {
        name: 'cjs',
        value: 'cjs',
        description: 'CommonJS',
      },
    ],
  });
}
