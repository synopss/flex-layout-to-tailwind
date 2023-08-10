import chalk from 'chalk';

let DEBUG = false;

export function setDebugMode(): void {
  DEBUG = true;
}

export const logger = {
  blue: logBlue,
  bold: logBold,
  debug: logDebug,
  error: logError,
  yellow: logYellow,
} as const;

function logBlue(text: string): void {
  console.log(chalk.blue(text));
}

function logDebug(text: string): void {
  DEBUG && console.debug(chalk.yellow('ⓘ ') + text);
}

function logError(text: string): void {
  console.error(chalk.red(`Error: ${text}`));
}

function logBold(text: string): void {
  console.log(chalk.bold(text));
}

function logYellow(text: string): void {
  console.log(chalk.yellow(text));
}
