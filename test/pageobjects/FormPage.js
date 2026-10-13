const BasePage = require('./BasePage');

class FormPage extends BasePage {
  get screen() { return $('~Forms-screen'); }
  get input() { return $('~text-input'); }
  get inputResult() { return $('~input-text-result'); }
  get switchControl() { return $('~switch'); }
  get switchText() { return $('~switch-text'); }
  get dropdown() { return $('~Dropdown'); }
  get activeButton() { return $('~button-Active'); }

  async open() {
    await $('~Forms').click();
    await this.screen.waitForDisplayed({ timeout: 10000 });
  }

  async selectDropdownOption(label) {
    await this.dropdown.click();
    const option = $(`android=new UiSelector().text("${label}")`);
    await option.waitForDisplayed({ timeout: 5000 });
    await option.click();
  }
}

module.exports = new FormPage();
