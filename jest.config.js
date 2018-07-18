module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/tests/**/*.spec.(js|ts)?(x)'],
  moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
