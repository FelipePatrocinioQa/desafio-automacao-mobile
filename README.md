# 📱 Desafio de Automação de Testes Mobile

Este projeto foi desenvolvido como parte do desafio de automação de testes mobile, utilizando o aplicativo **native-demo-app** do WebDriverIO.  
O objetivo é criar uma suíte de testes automatizados cobrindo as principais funcionalidades do app, com integração em diferentes ambientes e geração de evidências.

---

## 🚀 Tecnologias Utilizadas
- **Linguagem:** JavaScript  
- **Framework de Testes:** [WebdriverIO](https://webdriver.io/)  
- **Automação Mobile:** [Appium](https://appium.io/)  
- **Gerenciador de Testes:** Mocha  
- **Asserts:** Chai  
- **Relatórios:** Allure Report (ou ExtentReport)  
- **CI/CD:** GitLab CI/CD  
- **Cloud de Dispositivos:** BrowserStack  
- **Controle de Versão:** Git  

---

## 🛠️ Requisitos do Ambiente

Para executar o projeto corretamente, é necessário instalar/configurar:

### Ferramentas Essenciais
- [Node.js](https://nodejs.org/) (versão 16 ou superior)  
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)  
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (versão 11 ou superior)  
- [Android Studio](https://developer.android.com/studio) (para emulador Android e SDK)  
- [Xcode](https://developer.apple.com/xcode/) (para execução em iOS, apenas em macOS)  
- [Appium](https://appium.io/) (instalado globalmente ou via npm)  
  ```bash
  npm install -g appium

---

## 📂 Estrutura do Projeto

desafio-automacao-mobile/
├── test/
│   ├── specs/          # Cenários de teste
│   ├── pageobjects/    # Page Objects
│   └── data/           # Arquivos CSV/JSON para data-driven
├── reports/            # Relatórios de execução
├── wdio.conf.js         # Configuração do WebDriverIO
├── package.json
├── .gitlab-ci.yml      # Pipeline CI/CD
└── README.md


---

## 🧪 Cenários de Teste
Foram implementados **10 cenários principais**, cobrindo:
1. Login válido  
2. Login inválido (mensagem de erro)  
3. Cadastro de novo usuário  
4. Cadastro com dados inválidos  
5. Navegação entre telas (Home → Settings → Profile)  
6. Preenchimento de formulário simples  
7. Formulário com dados inválidos (erro exibido)  
8. Verificação de mensagens de sucesso  
9. Logout  
10. Fluxo completo: Cadastro → Login → Navegação → Logout  

---

## 🏗️ Padrão Page Object
Os elementos e ações da interface foram organizados em classes dentro da pasta `pageobjects/`.  
Exemplo: `LoginPage.js`
```javascript
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

⚙️ Execução dos Testes
Local (Android/iOS)
Inicie o servidor Appium:

npx appium

Execute os testes:

npx wdio run wdio.conf.js

BrowserStack (opcional)
Configure as credenciais no wdio.conf.js:

services: ['browserstack'],
user: process.env.BROWSERSTACK_USER,
key: process.env.BROWSERSTACK_KEY,

