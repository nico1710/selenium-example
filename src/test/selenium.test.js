import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import { suite } from "selenium-webdriver/testing/index.js";
import chrome from "selenium-webdriver/chrome.js";
import assert from "assert";

suite(function (env) {
  describe("Selenium test", () => {
    let driver;

    before(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
    });

    after(async () => await driver.quit());

    it("Realiza una búsqueda en Google", async () => {
      const query = "chatgpt";

      await driver.get("https://www.google.com");
      await driver.findElement(By.name("q")).sendKeys(query, Key.RETURN);
      await driver.wait(until.titleIs(`${query} - Buscar con Google`), 5000);

      const title = await driver.getTitle();
      assert.equal(title, `${query} - Buscar con Google`);
    });
  });
});
