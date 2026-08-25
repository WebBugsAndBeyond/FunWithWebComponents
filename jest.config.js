export default {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/build-test'],
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  collectCoverage: true,
  collectCoverageFrom: [
      '<rootDir>/build-test/**/*.js',
      '!<rootDir>/build-test/**/*.test.js',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    "^.+\\.js$": ["babel-jest", { sourceMaps: true, retainLines: true }],
  },
  verbose: true,
};
