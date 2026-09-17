const puppeteer = require("puppeteer");

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
});

afterEach(async () => {
  await browser.close();
});

describe("Бронирование билетов в кино (Первая часть)", () => {
  
  test("Успешное бронирование билета на завтра", async () => {
    await page.goto("http://tmweb.ru", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".page-nav__day:nth-child(2)");
    await page.click(".page-nav__day:nth-child(2)");

    await page.waitForSelector(".movie-seances__time");
    await page.click(".movie-seances__time");

    await page.waitForSelector(".buying-scheme__chair");
    const freeChair = await page.$(".buying-scheme__chair:not(.buying-scheme__chair_taken)");
    await freeChair.click();
    
    await page.click("button.acceptin-button");
    await page.waitForSelector(".ticket__check-title");
    const text = await page.$eval(".ticket__check-title", el => el.textContent);
    expect(text).toContain("Вы выбрали билеты:");
  }, 60000);

  test("Успешное бронирование билета на послезавтра", async () => {
    await page.goto("http://tmweb.ru", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".page-nav__day:nth-child(3)");
    await page.click(".page-nav__day:nth-child(3)");

    await page.waitForSelector(".movie-seances__time");
    await page.click(".movie-seances__time");

    await page.waitForSelector(".buying-scheme__chair");
    const freeChair = await page.$(".buying-scheme__chair:not(.buying-scheme__chair_taken)");
    await freeChair.click();
    
    await page.click("button.acceptin-button");
    await page.waitForSelector(".ticket__check-title");
    const text = await page.$eval(".ticket__check-title", el => el.textContent);
    expect(text).toContain("Вы выбрали билеты:");
  }, 60000);

  test("Попытка бронирования занятого места (Кнопка брони заблокирована)", async () => {
    await page.goto("http://tmweb.ru", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".page-nav__day:nth-child(1)");
    await page.click(".page-nav__day:nth-child(1)");

    await page.waitForSelector(".movie-seances__time");
    await page.click(".movie-seances__time");

    await page.waitForSelector(".buying-scheme__wrapper");
    const takenChair = await page.$(".buying-scheme__chair_taken");
    if (takenChair) {
      await takenChair.click();
    }
    
    const isButtonDisabled = await page.$eval("button.acceptin-button", (button) => button.disabled);
    expect(isButtonDisabled).toBe(true);
  }, 60000);
});
