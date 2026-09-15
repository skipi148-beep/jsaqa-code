const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Базовый URL по заданию
    viewportWidth: 1366,  // Самое популярное разрешение ноутбуков
    viewportHeight: 768,
    setupNodeEvents(on, config) {
      // настройки событий
    },
  },
});
