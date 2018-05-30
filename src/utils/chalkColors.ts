const chalk = require('chalk');

export const cyanText = (text: string): string => chalk.cyan(text);

export const cyanBoldText = (text: string): string => chalk.cyan.bold(text);

export const greenText = (text: string): string => chalk.green(text);

export const grayText = (text: string): string => chalk.gray(text);

export const warningText = (text: string): string => chalk.red.bold(text);