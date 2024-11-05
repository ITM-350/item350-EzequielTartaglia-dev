// jest.config.js
module.exports = {
  collectCoverage: true, // Asegúrate de que esto esté habilitado
  coverageDirectory: 'coverage', // Directorio donde se almacenará el informe de cobertura
  collectCoverageFrom: [
    'src/**/*.js', // Incluye todos los archivos .js en la carpeta src
    'backend/**/*.js', // Incluye todos los archivos .js en la carpeta backend
  ],
  coverageThreshold: {
    './src/*.js': {
      lines: 80,
    },
    './backend/*.js': {
      lines: 80,
    },
  },
};
