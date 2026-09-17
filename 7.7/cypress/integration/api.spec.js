describe('API тесты - Проверка сервера кинотеатра', () => {
  it('1. Проверка доступности главной страницы клиента (GET)', () => {
    
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('2. Проверка доступности страницы админки (GET)', () => {
    cy.request('/admin').then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
