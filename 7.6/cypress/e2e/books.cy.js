describe("Тестирование библиотеки книг на Cypress", () => {
  beforeEach(() => {
    // Переходим на главную страницу, используя baseUrl из cypress.config.js
    cy.visit("/"); 
  });

  // --- Базовые тесты ---
  it("Успешное отображение главной страницы библиотеки", () => {
    cy.contains("Boooook").should("be.visible");
  });

  it("Успешная авторизация пользователя", () => {
    cy.login("test@test.com", "test"); // Вызов кастомной команды из support/commands.js
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  // --- 3 обязательных теста для работы с разделом «Избранное» ---
  it("Успешное добавление новой книги в избранное", () => {
    cy.login("test@test.com", "test");
    cy.contains("Add new").click();
    cy.get("#title").type("Чистый код");
    cy.get("#description").type("Книга о хорошем коде");
    cy.get("#authors").type("Роберт Мартин");
    cy.get("#favorite").click(); // Добавляем галочку в Избранное
    cy.contains("Submit").click();
    cy.contains("Чистый код").should("be.visible");
  });

  it("Удаление книги из избранного", () => {
    cy.login("test@test.com", "test");
    cy.contains("Delete from favorite").first().click();
    cy.contains("Delete from favorite").should("not.exist");
  });

  it("Отображение книг в специальном разделе Favorites", () => {
    cy.login("test@test.com", "test");
    cy.contains("Favorites").click();
    cy.url().should("include", "/favorites");
  });
});
