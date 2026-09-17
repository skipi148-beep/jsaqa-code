const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://qamid.tmweb.ru", // <-- Возвращаем оригинальный URL проекта
    supportFile: false,
    specPattern: "cypress/integration/**/*.spec.js"
  },
});
