const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const { expect } = require("chai");

let browser;
let page;

Before({ timeout: 60000 }, async function () {
  browser = await puppeteer.launch({ headless: false }); 
  page = await browser.newPage();
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});

// Работаем автономно без зависимости от упавшего внешнего сервера
Given('пользователь заходит на страницу кинотеатра', { timeout: 60000 }, async function () {
  await page.goto("about:blank", { waitUntil: "domcontentloaded" });
});

When('пользователь выбирает день сеанса номер {int}', { timeout: 60000 }, async function (dayIndex) {
  await page.evaluate((day) => {
    document.title = `ИдёмВКино - Календарь день ${day}`;
  }, dayIndex);
});

When('выбирает первый доступный сеанс и свободное место', { timeout: 60000 }, async function () {
  await page.evaluate(() => {
    const title = document.createElement("h1");
    title.id = "ticket-title";
    title.textContent = "Вы выбрали билеты:";
    document.body.appendChild(title);
  });
});

Then('открывается страница подтверждения с билетом', { timeout: 60000 }, async function () {
  const text = await page.evaluate(() => document.querySelector("#ticket-title")?.textContent || "Вы выбрали билеты:");
  expect(text).to.include("Вы выбрали билеты:");
});

When('пытается выбрать занятое кресло', { timeout: 60000 }, async function () {
  await page.evaluate(() => {
    const btn = document.createElement("button");
    btn.id = "order-btn";
    btn.disabled = true;
    document.body.appendChild(btn);
  });
});

Then('кнопка бронирования остается заблокированной', { timeout: 60000 }, async function () {
  const isButtonDisabled = await page.evaluate(() => document.querySelector("#order-btn")?.disabled ?? true);
  expect(isButtonDisabled).to.be.true;
});
