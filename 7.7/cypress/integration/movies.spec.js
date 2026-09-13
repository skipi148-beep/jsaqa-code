describe("Тестирование кинотеатра ИдёмВКино", () => {
  beforeEach(() => {
    // Подгружаем наши селекторы из фикстуры selectors.json
    cy.fixture("selectors").as("selectors");
  });

  it("1. Успешное отображение главной страницы клиента", function () {
    cy.visit("http://tmweb.ru");
    cy.get(this.selectors.client.title).should("contain", "ИдёмВКино");
    cy.get(this.selectors.client.days).should("have.length", 7);
  });

  it("2. Happy Path: Успешный вход в админку кинотеатра", function () {
    cy.visit("http://tmweb.ru");
    cy.get(this.selectors.admin.loginInput).type("admin@petscu.ru");
    cy.get(this.selectors.admin.passwordInput).type("admin");
    cy.get(this.selectors.admin.submitButton).click();
    cy.get(this.selectors.admin.hallManagement).should("be.visible");
  });

  it("3. UI-тест: Бронирование билета на завтра", function () {
    cy.visit("http://tmweb.ru");
    cy.get(this.selectors.client.days).eq(1).click(); // Клик на завтрашний день
    cy.get(this.selectors.client.seanceTime).first().click(); // Первый сеанс
    cy.get(".wrapper .chair_standart").not(".chair_taken").first().click(); // Свободное место
    cy.get(this.selectors.client.acceptButton).click();
    cy.get(this.selectors.client.ticketTitle).should("contain", "Вы выбрали билеты:");
  });
});
