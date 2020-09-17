module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  verbose: true,
  rootDir: '..',
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
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
