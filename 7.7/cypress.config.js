const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "jg63d4", 
    baseUrl: "http://qamid.tmweb.ru",
    supportFile: false,
    specPattern: "cypress/integration/**/*.spec.js"
  },
});
