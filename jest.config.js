module.exports = {
  preset: 'ts-jest',
  rootDir: '.',
  verbose: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '^@react3l\\/react3l\\/(.*)$': '<rootDir>/src/$1',
    '^@react3l\\/advanced-filters\\/(.*)$': '<rootDir>/src/advanced-filters/$1',
    '^@react3l\\/axios-observable\\/(.*)$': '<rootDir>/src/axios-observable/$1',
    '^@react3l\\/common\\/(.*)$': '<rootDir>/src/common/$1',
    '^@react3l\\/decorators\\/(.*)$': '<rootDir>/src/decorators/$1',
    '^@react3l\\/localization\\/(.*)$': '<rootDir>/src/localization/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/example/*'],
};
