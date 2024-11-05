// jest.config.js
module.exports = {
  collectCoverage: true, 
  coverageDirectory: 'coverage', 
  coverageThreshold: {
    
    './src/*.js': {
      lines: 80,
    },
    './backend/*.js': {
      lines: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.js', 
    'backend/**/*.js', 
  ],
};
