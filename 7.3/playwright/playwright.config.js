module.exports = {
  testDir: "./tests", // Указываем папку с тестами
  testMatch: ["**/*.spec.js", "**/*.js"], // Маска для поиска файлов тестов
  use: {
    headless: false, // Открывать браузер на экране во время теста
    browserName: "chromium", // Использовать Chromium
  },
};
