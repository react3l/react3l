module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  globals: {},
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@react3l\\/react3l\\/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': 'babel-jest',
  },
};
