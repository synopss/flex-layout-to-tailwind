import { Config } from '@jest/types';
import { compilerOptions } from './tsconfig.json';

const jestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'node',
};

export default jestConfig;
