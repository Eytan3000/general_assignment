import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/test'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};

export default config;
