import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: true,
  roots: ['./src'],
  testEnvironment: 'jsdom',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  // https://regex101.com/r/tiSozd/1
  testRegex: '\\.(test|spec)\\.tsx?$',
  // testMatch: [
  //   '**/HelloWorld.spec.tsx',
  //   // '**/ObjectId.scalar.spec.ts',
  //   // '**/TypegooseMiddleware.spec.ts',
  // ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};

export default config;
