/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'es-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
