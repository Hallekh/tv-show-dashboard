module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'vue'],
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest'
    }
  };
  