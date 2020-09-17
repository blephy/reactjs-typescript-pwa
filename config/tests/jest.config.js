module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  testEnvironment: 'node',
  verbose: true,
  rootDir: '../..',
  setupFilesAfterEnv: ['<rootDir>/config/tests/setupTests.js'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage/',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.test.ts'
  ]
}
