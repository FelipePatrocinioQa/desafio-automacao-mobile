class LoginPage {
  get navigationTab() { return $('~Login'); }
  get loginMode() { return $('~button-login-container'); }
  get signUpMode() { return $('~button-sign-up-container'); }
  get emailInput() { return $('~input-email'); }
  get passwordInput() { return $('~input-password'); }
  get confirmationInput() { return $('~input-repeat-password'); }
  get loginButton() { return $('~button-LOGIN'); }
  get signUpButton() { return $('~button-SIGN UP'); }

  async openLogin() {
    await this.navigationTab.click();
    await this.loginMode.click();
    await this.emailInput.waitForDisplayed({ timeout: 10000 });
  }

  async openSignUp() {
    await this.openLogin();
    await this.signUpMode.click();
    await this.confirmationInput.waitForDisplayed({ timeout: 10000 });
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async signUp(email, password, confirmation) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.confirmationInput.setValue(confirmation);
    await this.signUpButton.click();
  }
}

module.exports = new LoginPage();
