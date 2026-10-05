/** @jest-config-loader ts-node */

import { defineConfig } from 'jest';

export default defineConfig({
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^src/(.*)": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
});
