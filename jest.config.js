module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  globals: {
    'ts-jest': {
      tsconfig: {
        allowJs: true,
      },
    },
  },
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@react3l\\/react3l\\/(.*)$": "<rootDir>/src/$1",
  },
  preset: 'ts-jest',
  transformIgnorePatterns: [],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
  },
};
