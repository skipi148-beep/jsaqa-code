const { defineConfig } = require('cypress'); module.exports = defineConfig({ e2e: { specPattern: 'cypress/integration/**/*.spec.js', supportFile: false, fixturesFolder: 'cypress/fixtures' } });
