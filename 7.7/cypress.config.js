const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "69p8u7", // Уникальный ID проекта для Cypress Cloud
    specPattern: "cypress/integration/**/*.spec.js",
    supportFile: false,
    fixturesFolder: "cypress/fixtures"
  },
});
