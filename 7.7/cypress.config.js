const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "69p8u7", // ID для интеграции с Cypress Cloud Dashboard
    specPattern: "cypress/integration/**/*.spec.js",
    supportFile: false,
    fixturesFolder: "cypress/fixtures"
  },
});
