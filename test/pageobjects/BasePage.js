class BasePage {
  async waitForElement(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  async isElementDisplayed(selector, timeout = 5000) {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout });
      return true;
    } catch (error) {
      return false;
    }
  }

  async goBack() {
    await driver.back();
  }
}

module.exports = BasePage;
