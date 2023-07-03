import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const selenium = async () => {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeService(new chrome.ServiceBuilder("./chromedriver.exe"))
    .build();
  try {
    await driver.get("https://www.google.com/");
    await driver.findElement(By.name("q")).sendKeys("chatgpt", Key.RETURN);
    await driver.wait(until.titleIs("chatgpt - Buscar con Google"), 5000);
    const title = await driver.getTitle();
    console.log(title);
  } catch (err) {
    console.log(err);
  } finally {
    await driver.quit();
  }
};

selenium();
