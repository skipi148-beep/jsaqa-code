const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test("Успешная авторизация", async ({ page }) => {
  // Открываем форму авторизации Нетологии
  await page.goto("https://netology.ru");

  // Вводим ваш email
  await page.fill('input[type="email"]', email);

  // Вводим ваш пароль
  await page.fill('input[type="password"]', password);

  // Нажимаем на кнопку Войти
  await page.click('[data-testid="login-submit-btn"]');

  // Проверяем, что появился заголовок профиля
  const header = page.locator("h2").first();
  await expect(header).toBeVisible({ timeout: 15000 });
});

test("Неуспешная авторизация", async ({ page }) => {
  // Открываем форму авторизации
  await page.goto("https://netology.ru");

  // Вводим невалидный email
  await page.fill('input[type="email"]', "wrong_email_test@example.com");

  // Вводим невалидный пароль
  await page.fill('input[type="password"]', "WrongPassword123");

  // Нажимаем на кнопку Войти
  await page.click('[data-testid="login-submit-btn"]');

  // Проверяем текст об ошибке
  const errorAlert = page.locator('[data-testid="login-error-hint"]');
  await expect(errorAlert).toBeVisible();
  await expect(errorAlert).toContainText("Вы ввели неверный логин или пароль");
});
