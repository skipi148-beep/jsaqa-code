const puppeteer = require("puppeteer");

let browser;
let page;

// ГЛОБАЛЬНЫЕ ХУКИ (Вынесены на самый верх, чтобы соблюдался принцип DRY)
beforeAll(async () => {
  browser = await puppeteer.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage(); // Страница создается один раз перед каждым тестом
});

afterEach(async () => {
  await page.close(); // Страница автоматически закрывается после каждого теста
});


// БЛОК 1: Тесты для главной страницы GitHub (Ваш изначальный код)
describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com");
  });

  // Тест 1 с индивидуальным тайм-аутом 15000мс
  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toContain("GitHub");
  }, 15000);

  // Тест 2 с индивидуальным тайм-аутом 15000мс
  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 15000);

  // Тест 3 с индивидуальным тайм-аутом 15000мс
  test("The page contains Sign in button", async () => {
    const title = await page.title();
    expect(title).toContain("GitHub");
  }, 15000);
});



// БЛОК 2: Новая группа тестов для Задачи 2 (Соблюден принцип DRY)
describe("Github other pages tests", () => {

  test("The Features page title", async () => {
    await page.goto("https://github.com/features"); // ДОПИСАЛИ /features
    const title = await page.title();
    expect(title).toContain("Features");
  }, 15000);

  test("The Enterprise page title", async () => {
    await page.goto("https://github.com/enterprise"); // ДОПИСАЛИ /enterprise
    const title = await page.title();
    expect(title).toContain("Enterprise");
  }, 15000);

  test("The Marketplace page title", async () => {
    await page.goto("https://github.com/marketplace"); // ДОПИСАЛИ /marketplace
    const title = await page.title();
    expect(title).toContain("Marketplace");
  }, 15000);
});
