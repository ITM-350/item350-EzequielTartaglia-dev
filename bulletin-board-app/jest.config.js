module.exports = {
  coverageThreshold: {
    // Set coverage threshold for all .js files in the src directory
    './src/*.js': {
      lines: 80,
    },
    // Set coverage threshold for all .js files in the backend directory
    './backend/*.js': {
      lines: 80,
    },
  },
};
