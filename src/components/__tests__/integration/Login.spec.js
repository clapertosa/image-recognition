import puppeteer from "puppeteer";

describe("In Login component", () => {
  let browser, page, emailInput, passwordInput, submitButton;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();

    await page.goto("http://localhost:3000/login");
    emailInput = await page.$('input[name="email"]');
    passwordInput = await page.$('input[name="password"]');
    submitButton = await page.$('button[type="submit"]');
  });

  afterEach(() => {
    browser.close();
  });

  describe("a registered user", () => {
    test("should login", async () => {
      await emailInput.type("wolf@wolf.com");
      await passwordInput.type("password");
      await submitButton.click();
      await page.waitFor(1000);
      const userNavItem = await page.$("li>a[href='/user']");
      expect(userNavItem).not.toBeNull();
      expect(page.url()).toEqual("http://localhost:3000/");
    });
  });

  describe("a non registered user", () => {
    test("should be rejected", async () => {
      await emailInput.type("not@registered.not");
      await passwordInput.type("password");
      await submitButton.click();
      await page.waitFor(1000);
      const errorMessage = await page.$eval("form > span", el => el.innerHTML);
      const userNavItem = await page.$("li>a[href='/user']");
      expect(errorMessage).toEqual("Wrong email or password");
      expect(userNavItem).toBeNull();
      expect(page.url()).toEqual("http://localhost:3000/login");
    });
  });

  describe("invalid email", () => {
    test("should be rejected", async () => {
      await emailInput.type("notvalidemai[#l@.com");
      await passwordInput.type("password");
      await submitButton.click();
      const emailError = await page.$eval("form > div > p", el => el.innerHTML);
      expect(emailError).toEqual("Email is not valid");
    });
  });

  describe("input", () => {
    test("should be required", async () => {
      await submitButton.click();
      let errors = await page.$$eval("form > div > p", err =>
        err.map(e => e.innerHTML)
      );
      expect(errors[0]).toEqual("Email is required");
      expect(errors[1]).toEqual("Password is required");
    });
  });
});
