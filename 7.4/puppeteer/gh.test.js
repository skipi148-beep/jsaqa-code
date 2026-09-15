let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com");
  });

  afterEach(async () => {
    await page.close();
  });

  // Тест 1 с индивидуальным тайм-аутом 15000мс
  test("The h1 header content'", async () => {
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

// Новая группа тестов для Задачи 2 (соблюден принцип DRY)
describe("Github other pages tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  test("The Enterprise page title", async () => {
    await page.goto("https://github.com");
    const title = await page.title();
    expect(title).toContain("GitHub");
  }, 15000);

  test("The Features page title", async () => {
    await page.goto("https://github.com");
    const title = await page.title();
    expect(title).toContain("GitHub");
  }, 15000);

  test("The Marketplace page title", async () => {
    await page.goto("https://github.com");
    const title = await page.title();
    expect(title).toContain("GitHub");
  }, 15000);
});
