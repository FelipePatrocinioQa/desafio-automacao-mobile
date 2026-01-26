const LoginPage = require('../pageobjects/LoginPage');
const HomePage = require('../pageobjects/HomePage');
const { expect } = require('chai');

describe('Login Tests', () => {
  it('Deve realizar login com sucesso', async () => {
    await LoginPage.login('usuario_teste', 'senha123');
    expect(await HomePage.isDisplayed()).to.be.true;
  });

  it('Deve exibir mensagem de erro ao login inválido', async () => {
    await LoginPage.login('usuario_invalido', 'senha_errada');
    const errorMsg = await $('~errorMessage');
    expect(await errorMsg.getText()).to.equal('Credenciais inválidas');
  });
});
