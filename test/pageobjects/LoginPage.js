class LoginPage {
  get inputUsername() { return $('~username'); }
  get inputPassword() { return $('~password'); }
  get btnLogin() { return $('~loginBtn'); }

  async login(user, pass) {
    await this.inputUsername.setValue(user);
    await this.inputPassword.setValue(pass);
    await this.btnLogin.click();
  }
}
module.exports = new LoginPage();
