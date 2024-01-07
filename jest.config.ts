import type {Config} from 'jest';
import {defaults} from 'jest-config';

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"],
};

export default config;