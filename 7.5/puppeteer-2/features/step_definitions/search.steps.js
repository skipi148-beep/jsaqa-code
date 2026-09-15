const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const { expect } = require("chai"); // Библиотека Chai для проверок
const { clickElement, getText } = require("../../lib/commands.js");

let browser;
let page;

// Хук Before открывает браузер перед тестом
Before(async function () {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
});

// Хук After закрывает браузер после теста
After(async function () {
  if (browser) {
    await browser.close();
  }
});

// Шаг 1: Переход на сайт кинотеатра
Given("пользователь заходит на страницу кинотеатра", async function () {
  await page.goto("http://tmweb.ru");
});

// Шаг 2: Выбор завтрашнего дня
When("пользователь выбирает завтрашний день сеанса", async function () {
  await clickElement(page, "a.page-nav__day:nth-child(2)");
});

// Шаг 3: Выбор сеанса и свободного кресла
When("выбирает сеанс и свободное стандартное кресло", async function () {
  await clickElement(page, "a.movie-seances__time"); // Клик на сеанс
  await clickElement(page, ".wrapper:nth-child(3) .chair:nth-child(5)"); // Клик на кресло
  await clickElement(page, "button.acceptin-button"); // Клик «Забронировать»
});

// Шаг 4: Проверка билета (Happy Path)
Then("открывается страница подтверждения с билетом", async function () {
  const text = await getText(page, ".ticket__check-title");
  expect(text).to.include("Вы выбрали билеты:");
});

// Шаг 5: Выбор сегодняшнего дня для Sad Path
When("пользователь выбирает сегодняшний день сеанса", async function () {
  await clickElement(page, "a.page-nav__day:nth-child(1)");
});

// Шаг 6: Поиск занятого места
When("выбирает занятое кресло", async function () {
  await clickElement(page, "a.movie-seances__time");
  await page.waitForSelector(".wrapper .chair_taken");
});

// Шаг 7: Проверка блокировки кнопки (Sad Path)
Then("кнопка бронирования остается заблокированной", async function () {
  const isButtonDisabled = await page.$eval("button.acceptin-button", (button) => button.disabled);
  expect(isButtonDisabled).to.be.true;
});
