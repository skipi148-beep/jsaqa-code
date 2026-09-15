const { clickElement, getText } = require("./lib/commands.js");

let page;

describe("ИдёмВКино - Бронирование билетов (Тест-сьют)", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://tmweb.ru"); // Сайт кинотеатра
  });

  // Хук afterEach удален, так как jest-environment-puppeteer закрывает страницы автоматически

  test("Успешное бронирование стандартного места на завтра", async () => {
    const daySelector = "a.page-nav__day:nth-child(2)"; // Завтра
    const timeSelector = "a.movie-seances__time"; // Сеанс
    const seatSelector = ".wrapper:nth-child(3) .chair:nth-child(5)"; // Свободное место
    const submitButton = "button.acceptin-button";

    await clickElement(page, daySelector);
    await clickElement(page, timeSelector);
    await clickElement(page, seatSelector);
    await clickElement(page, submitButton);

    const text = await getText(page, ".ticket__check-title");
    expect(text).toContain("Вы выбрали билеты:");
  }, 20000);

  test("Успешное бронирование VIP-места на послезавтра", async () => {
    const daySelector = "a.page-nav__day:nth-child(3)"; // Послезавтра
    const timeSelector = "a.movie-seances__time";
    const vipSeatSelector = ".wrapper:nth-child(4) .chair_vip:nth-child(2)"; // VIP место
    const submitButton = "button.acceptin-button";

    await clickElement(page, daySelector);
    await clickElement(page, timeSelector);
    await clickElement(page, vipSeatSelector);
    await clickElement(page, submitButton);

    const text = await getText(page, ".ticket__check-title");
    expect(text).toContain("Вы выбрали билеты:");
  }, 20000);

  test("Попытка бронирования занятого места (Кнопка брони заблокирована)", async () => {
    const daySelector = "a.page-nav__day:nth-child(1)"; // Сегодня
    const timeSelector = "a.movie-seances__time";
    const takenSeatSelector = ".wrapper .chair_taken"; // Занятое место

    await clickElement(page, daySelector);
    await clickElement(page, timeSelector);
    await page.waitForSelector(takenSeatSelector);

    const isButtonDisabled = await page.$eval("button.acceptin-button", (button) => button.disabled);
    expect(isButtonDisabled).toBeTruthy();
  }, 20000);
});
