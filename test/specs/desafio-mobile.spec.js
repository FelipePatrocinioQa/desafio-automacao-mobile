const LoginPage = require('../pageobjects/LoginPage');
const FormPage = require('../pageobjects/FormPage');

const loginData = require('../data/massas/login.json');
const cadastroData = require('../data/massas/cadastro.json');
const formularioData = require('../data/massas/formulario.json');

const validLogin = loginData.validos[0];
const invalidEmailLogin = loginData.invalidos[0];
const invalidPasswordLogin = loginData.invalidos[1];

const generateUniqueEmail = () => `qa.mobile.${Date.now()}${Math.floor(Math.random() * 1000)}@example.com`;

const validCadastro = { ...cadastroData.validos[0], email: generateUniqueEmail() };
const invalidCadastro = { ...cadastroData.invalidos[0], email: generateUniqueEmail() };

const formTextCase = formularioData.texto[0];
const formLimitCase = formularioData.texto[1];

async function waitForAlertText() {
  await browser.waitUntil(async () => {
    try {
      return Boolean(await browser.getAlertText());
    } catch (error) {
      return false;
    }
  }, { timeout: 10000, interval: 250 });

  return browser.getAlertText();
}

describe('Desafio mobile - native-demo-app', () => {
  it('01 - realiza login com email e senha válidos', async () => {
    await LoginPage.openLogin();
    await LoginPage.login(validLogin.email, validLogin.password);

    expect(await waitForAlertText()).to.contain('You are logged in!');
    await browser.acceptAlert();
  });

  it('02 - valida email inválido no login', async () => {
    await LoginPage.openLogin();
    await LoginPage.login(invalidEmailLogin.email, invalidEmailLogin.password);

    const emailError = $('android=new UiSelector().text("Please enter a valid email address")');
    await emailError.waitForDisplayed({ timeout: 5000 });
    expect(await emailError.isDisplayed()).to.be.true;
  });

  it('03 - valida senha com menos de oito caracteres no login', async () => {
    await LoginPage.openLogin();
    await LoginPage.login(invalidPasswordLogin.email, invalidPasswordLogin.password);

    const passwordError = $('android=new UiSelector().text("Please enter at least 8 characters")');
    await passwordError.waitForDisplayed({ timeout: 5000 });
    expect(await passwordError.isDisplayed()).to.be.true;
  });

  it('04 - conclui cadastro com senhas iguais e válidas', async () => {
    await LoginPage.openSignUp();
    await LoginPage.signUp(validCadastro.email, validCadastro.password, validCadastro.confirmation);

    expect(await waitForAlertText()).to.contain('You successfully signed up!');
    await browser.acceptAlert();
  });

  it('05 - valida confirmação de senha diferente no cadastro', async () => {
    await LoginPage.openSignUp();
    await LoginPage.signUp(invalidCadastro.email, invalidCadastro.password, invalidCadastro.confirmation);

    const confirmationError = $('android=new UiSelector().text("Please enter the same password")');
    await confirmationError.waitForDisplayed({ timeout: 5000 });
    expect(await confirmationError.isDisplayed()).to.be.true;
  });

  it('06 - exibe o texto digitado no resultado do campo', async () => {
    await FormPage.open();
    await FormPage.input.setValue(formTextCase.value);

    expect(await FormPage.inputResult.getText()).to.equal(formTextCase.expected);
  });

  it('07 - limita o campo de texto a trinta caracteres', async () => {
    await FormPage.open();
    await FormPage.input.setValue(formLimitCase.value);

    expect(await FormPage.input.getValue()).to.equal(formLimitCase.expected);
    expect(await FormPage.inputResult.getText()).to.equal(formLimitCase.expected);
  });

  it('08 - alterna o switch e atualiza sua mensagem', async () => {
    await FormPage.open();
    const currentText = await FormPage.switchText.getText();

    if (currentText.includes('OFF')) {
      await FormPage.switchControl.click();
    }

    expect(await FormPage.switchText.getText()).to.contain('ON');
    await FormPage.switchControl.click();
    expect(await FormPage.switchText.getText()).to.contain('OFF');
  });

  it('09 - seleciona uma opção no dropdown', async () => {
    await FormPage.open();
    await FormPage.selectDropdownOption('Appium is awesome');

    const selectedOption = $('android=new UiSelector().text("Appium is awesome")');
    expect(await selectedOption.isDisplayed()).to.be.true;
  });

  it('10 - botão ativo exibe o alerta esperado', async () => {
    await FormPage.open();
    await FormPage.activeButton.click();

    expect(await waitForAlertText()).to.contain('This button is active');
    await browser.acceptAlert();
  });
});