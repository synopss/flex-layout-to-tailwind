import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import fs from 'fs';
import { createSpinner } from 'nanospinner';
import path from 'path';
import semver from 'semver/preload';
import { readPackageVersion } from '../util/cli';
import { unshiftFile } from '../util/file-utils';
import { logger } from '../util/logger';

export async function tailwindInstall(input: string) {
  await addTailwindConfigFile(input);
  addCSSDirectives(input);
}

async function addTailwindConfigFile(input: string) {
  const regex = /tailwind.config.(js|ts|cjs)$/;
  const tailwindConfigFile = fs.readdirSync(input).find(file => RegExp(regex).exec(file));

  if (!tailwindConfigFile) {
    const tailwindConfigFileExtension = await handleTailwindConfigFile(input);
    const tailwindConfigFilePath = `tailwind.config.${tailwindConfigFileExtension}`;

    const spinner = createSpinner(`Creating 📄: ${chalk.bold(tailwindConfigFilePath)}`).start();

    const stubContentsFile = fs.readFileSync(path.resolve(__dirname, '../../stubs/config.js'), 'utf-8');
    let stubFile = fs.readFileSync(path.resolve(__dirname, `../../stubs/${tailwindConfigFilePath}`), 'utf-8');

    stubFile = stubFile.replace('__CONFIG__', stubContentsFile.replace('module.exports =', '').trim()).trim() + '\n';

    fs.writeFileSync(`${input}/${tailwindConfigFilePath}`, stubFile, 'utf-8');

    spinner.success({ text: `Created 📄: ${chalk.bold(tailwindConfigFilePath)}` });
  } else {
    logger.warning(`${tailwindConfigFile} already exists`);
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

function addCSSDirectives(input: string) {
  const content = '@tailwind base;\n' + '@tailwind components;\n' + '@tailwind utilities;\n';

  const regex = /styles.(css|scss|sass|less)$/;
  const stylesFile = fs.readdirSync(`${input}/src/`).find(file => RegExp(regex).exec(file));

  const spinnerContent = chalk.bold(`src/${stylesFile}`);
  const spinner = createSpinner(`Handling 📄: ${spinnerContent}`).start();

  if (stylesFile) {
    unshiftFile(`${input}/src/${stylesFile}`, content);
    spinner.success({ text: `Updated 📄: ${spinnerContent}` });
  } else {
    fs.writeFileSync(`${input}/src/styles.css`, content);
    spinner.success({ text: `Created 📄: ${spinnerContent}` });
  }
}
