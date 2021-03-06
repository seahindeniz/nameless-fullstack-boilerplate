import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: true,
  roots: ['./test', './src'],
  testEnvironment: 'node',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  // https://regex101.com/r/tiSozd/1
  testRegex: '\\.(test|spec)\\.tsx?$',
  // testMatch: [
  //   '**/dbConnection.spec.ts',
  //   // '**/ObjectId.scalar.spec.ts',
  //   // '**/TypegooseMiddleware.spec.ts',
  // ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
