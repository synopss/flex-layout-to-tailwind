import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import fs from 'fs';
import { createSpinner } from 'nanospinner';
import path from 'path';
import semver from 'semver/preload';
import { readPackageVersion } from '../util/cli';

export async function tailwindInstall(input: string) {
  const tailwindConfigLocation =
    path.resolve(`${input}/tailwind.config.js`) ||
    path.resolve(`${input}/tailwind.config.ts`) ||
    path.resolve(`${input}/tailwind.config.cjs`);

  if (!fs.existsSync(tailwindConfigLocation)) {
    const tailwindConfigFileExtension = await handleTailwindConfigFile(input);
    const tailwindConfigFilePath = `tailwind.config.${tailwindConfigFileExtension}`;

    const spinner = createSpinner(`Creating 📄: ${chalk.bold(tailwindConfigFilePath)}`).start();

    const stubContentsFile = fs.readFileSync(path.resolve(__dirname, '../../stubs/config.js'), 'utf-8');
    let stubFile = fs.readFileSync(path.resolve(__dirname, `../../stubs/${tailwindConfigFilePath}`), 'utf-8');

    stubFile = stubFile.replace('__CONFIG__', stubContentsFile.replace('module.exports =', '').trim()).trim() + '\n';

    fs.writeFileSync(`${input}/${tailwindConfigFilePath}`, stubFile, 'utf-8');

    spinner.success({ text: `Created 📄: ${chalk.bold(tailwindConfigFilePath)}` });
  }
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
