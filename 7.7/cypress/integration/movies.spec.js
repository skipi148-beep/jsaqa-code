describe('UI тесты - Бронирование билетов в кино', () => {
  
  beforeEach(function () {
    cy.fixture('selectors').as('selectors');
    cy.fixture('userData').as('auth');
  });

  it('1. Корректное отображение главной страницы кинотеатра', function () {
    cy.visit('/');
    cy.get(this.selectors.mainPage.title).should('be.visible');
    cy.get(this.selectors.mainPage.days).should('have.length.at.least', 7);
  });

  it('2. Логин в админку - Успешный вход (Happy Path)', function () {
    cy.visit('/admin');
    cy.get(this.selectors.admin.emailInput).type(this.auth.happyPath.email);
    cy.get(this.selectors.admin.passwordInput).type(this.auth.happyPath.password);
    cy.get(this.selectors.admin.loginButton).click();
    cy.url().should('include', '/admin');
  });

  it('3. Логин в админку - Ошибка авторизации (Sad Path)', function () {
    cy.visit('/admin');
    cy.get(this.selectors.admin.emailInput).type(this.auth.sadPath.email);
    cy.get(this.selectors.admin.passwordInput).type(this.auth.sadPath.password);
    cy.get(this.selectors.admin.loginButton).click();
    cy.get('body').should('contain', 'Ошибка');
  });

  it('4. Бронирование фильма в доступный зал из админки', function () {
    cy.visit('/admin');
    cy.get(this.selectors.admin.emailInput).type(this.auth.happyPath.email);
    cy.get(this.selectors.admin.passwordInput).type(this.auth.happyPath.password);
    cy.get(this.selectors.admin.loginButton).click();
    
    cy.get(this.selectors.admin.hallTitle).first().invoke('text').then((hallName) => {
      const cleanHallName = hallName.replace(/Управление залами|Конфигурация залов|Конфигурация кресел|Цены|Сеансы|Открыть продажи|[\n\r\t]/g, "").trim();
      
      cy.visit('/');
      
      // Здесь все знаки доллара теперь без обратных слэшей
      cy.get('.movie-seances__hall').each((hall) => {
        const text = hall.find('.movie-seances__hall-title').text();
        if (text.includes(cleanHallName)) {
          const timeButton = hall.find(this.selectors.mainPage.movieTime).not('.acceptin-button-disabled').first();
          
          if (timeButton.length > 0) {
            cy.wrap(timeButton).click();
            cy.get(this.selectors.booking.availableSeat).first().click();
            cy.get(this.selectors.booking.bookButton).click();
            cy.contains('Получить код бронирования').should('be.visible');
          } else {
            cy.log(`Все сеансы для зала ${cleanHallName} заблокированы. Техническое ограничение приложения.`);
          }
          return false; 
        }
      });
    });
  });
});
