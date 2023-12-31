import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import { suite } from "selenium-webdriver/testing/index.js";
import assert from "assert";

suite(function () {
  describe("Selenium test", () => {
    let driver;

    beforeEach(async () => {
      driver = await new Builder().forBrowser(Browser.EDGE).build();
    });

    afterEach(async () => await driver.quit());

    it("[www.google.com] Realiza una búsqueda en Google", async () => {
      const query = "chatgpt";

      await driver.get("https://www.google.com");
      await driver.findElement(By.name("q")).sendKeys(query, Key.RETURN);
      await driver.wait(until.titleIs(`${query} - Buscar con Google`), 5000);

      const title = await driver.getTitle();
      assert.equal(title, `${query} - Buscar con Google`);
    });

    it("[http://3.89.221.7] Realiza formulario", async () => {
      await driver.get("http://3.89.221.7/login");
      await driver
        .findElement(By.css("input.q-field__native.q-placeholder#login-email"))
        .sendKeys("n.hidalgo02@ufromail.cl");
      await driver
        .findElement(
          By.css("input.q-field__native.q-placeholder#login-password")
        )
        .sendKeys("2aSsword95%");
      await driver
        .findElement(
          By.css(
            "button.q-btn.q-btn-item.non-selectable.no-outline.q-btn--standard.q-btn--rectangle.bg-primary.text-white.q-btn--actionable.q-focusable.q-hoverable#login-submit"
          )
        )
        .click();
      await driver.wait(until.titleIs(`Pruebas de software - Ev.3`, 5000));

      const title = await driver.getTitle();
      assert.equal(title, `Pruebas de software - Ev.3`);
    });

    it("[http://3.89.221.7] Navegar a Sign up en el Login", async () => {
      await driver.get("http://3.89.221.7/login");

      const signUpLink = await driver.findElement(By.linkText("Sign up here"));
      await signUpLink.click();

      await driver.wait(until.titleIs(`Sign out`, 5000));

      const title = await driver.getTitle();
      assert.equal(title, `Sign out`);
    });

    it("[http://3.89.221.7] Comprueba si existe un mensaje de error, si no se ingresa ninguna credencial", async () => {
      await driver.get("http://3.89.221.7/login");

      await driver.findElement(By.id("login-submit")).submit();
      const pageSource = await driver.getPageSource();
      const errorMessage = pageSource.includes("Please type your email");
      assert.ok(errorMessage);
    });
  });
});
