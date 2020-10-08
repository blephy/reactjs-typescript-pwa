module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  rootDir: '../..',
  roots: ['<rootDir>'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  testEnvironment: 'jsdom',
  verbose: true,
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/config/tests/setupTests.js'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).(ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)$': '<rootDir>/config/tests/__mocks__/file.mock.js',
    '.+\\.(svg)$': '<rootDir>/config/tests/__mocks__/svgr.mock.jsx',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage/',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/index.tsx',
    '!<rootDir>/src/views/index.tsx',
    '!<rootDir>/src/service-worker.ts',
    '!<rootDir>/src/database/rich-snippets/**/*',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/*.test.ts'
  ],
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'coverage',
        outputName: 'test-execution-report.xml',
        reportedFilePath: 'relative'
      }
    ]
  ]
}
