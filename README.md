# Mobile Automation with WebdriverIO + Appium

Projeto de automação mobile para execução em Android utilizando WebdriverIO, Appium, Mocha e Allure Report.

O objetivo deste repositório é automatizar fluxos reais do app `native-demo-app` e permitir a execução local e em pipeline de CI com relatórios de execução em HTML.

---

## Visão geral

Este projeto cobre cenários de:
- login
- cadastro
- validação de mensagens de erro
- formulário
- switch
- dropdown
- botão ativo

A estrutura foi organizada em camadas para facilitar manutenção e reutilização:
- Page Objects para abstrair elementos e ações de cada tela
- massas em JSON para dados de teste
- suíte de testes em WebdriverIO
- relatório Allure para evidência de execução
- workflow do GitHub Actions para execução automatizada

---

## Stack utilizada

- JavaScript
- Node.js
- WebdriverIO
- Appium
- Mocha
- Chai
- Allure Report

---

## Estrutura do projeto

```text
desafio-automacao-mobile/
├── .github/
│   └── workflows/
│       └── mobile-tests.yml
├── reports/
│   ├── allure-results/
│   └── allure-report/
├── test/
│   ├── data/
│   │   └── massas/
│   │       ├── login.json
│   │       ├── cadastro.json
│   │       └── formulario.json
│   ├── pageobjects/
│   │   ├── BasePage.js
│   │   ├── FormPage.js
│   │   ├── LoginPage.js
│   │   └── ...
│   └── specs/
│       └── desafio-mobile.spec.js
├── .gitignore
├── .gitlab-ci.yml
├── package.json
├── wdio.conf.js
├── README.md
└── package-lock.json
```

### O que fica em cada pasta

- `.github/workflows/`: pipeline de execução em GitHub Actions
- `reports/`: artefatos de execução e relatório HTML do Allure
- `test/data/massas/`: arquivos JSON com massas de teste
- `test/pageobjects/`: mapeamento dos elementos e ações de cada tela
- `test/specs/`: cenários executáveis da automação
- `wdio.conf.js`: configuração central do WebdriverIO e Appium
- `package.json`: scripts e dependências do projeto

---

## Pré-requisitos

Antes de executar o projeto, verifique se os itens abaixo estão instalados:

### 1. Node.js
```bash
node -v
npm -v
```

### 2. Java JDK
```bash
java -version
```

### 3. Android Studio + Android SDK
Instale o Android Studio e certifique-se de que os caminhos abaixo existam:

```powershell
$env:LOCALAPPDATA\Android\Sdk
```

Além disso, confirme que os tools abaixo estejam disponíveis:
```powershell
adb version
emulator -list-avds
```

### 4. Appium
```powershell
npx appium --version
```

Se necessário, instale o Appium CLI e o driver do Android:

```powershell
npx appium driver install uiautomator2
```

---

## Variáveis de ambiente

O projeto lê a variável `DEMO_APP_APK` no arquivo [wdio.conf.js](wdio.conf.js). Quando ela não é informada, o projeto usa um caminho local padrão de exemplo.

### Configuração local no Windows (PowerShell)

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = "$env:LOCALAPPDATA\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:DEMO_APP_APK = "C:\wdio-native-demo-app-v2.2.0\apps\release\android.wdio.native.app.v2.2.0.apk"

$env:Path += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:JAVA_HOME\bin"
```

Depois disso, valide as variáveis:

```powershell
$env:ANDROID_HOME
$env:JAVA_HOME
$env:DEMO_APP_APK
adb version
```

### Configuração no GitHub Actions

No workflow da pipeline, a variável também é configurada de forma explícita:

```yaml
env:
  DEMO_APP_APK: /tmp/android.wdio.native.app.v2.2.0.apk
```

Essa variável é usada para baixar o APK do app demo antes da execução dos testes em CI.

---

## Setup do ambiente local

### 1. Instale as dependências
```powershell
cd C:\WorkSpace\Repositorios\desafio-automacao-mobile
npm install
```

### 2. Inicie o Android Emulator
Liste os emuladores disponíveis:
```powershell
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -list-avds
```

Inicie o emulador desejado:
```powershell
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd Medium_Phone_API_37.0
```

### 3. Verifique se o emulador está pronto
```powershell
adb devices
adb -s emulator-5554 wait-for-device
adb -s emulator-5554 shell getprop sys.boot_completed
```

O retorno esperado para a última instrução é:
```text
1
```

### 4. Inicie o Appium
Em outro terminal:
```powershell
cd C:\WorkSpace\Repositorios\desafio-automacao-mobile
npx.cmd appium --port 4723
```

### 5. Verifique o Appium
```powershell
Invoke-RestMethod http://127.0.0.1:4723/status
```

Se estiver funcionando, o servidor responderá com status do Appium.

---

## Execução dos testes

### Rodar a suíte completa
```powershell
cd C:\WorkSpace\Repositorios\desafio-automacao-mobile
npx.cmd wdio run ./wdio.conf.js
```

Ou via script do projeto:
```powershell
npm test
```

### Rodar um cenário específico
```powershell
npx.cmd wdio run ./wdio.conf.js --spec ./test/specs/desafio-mobile.spec.js
```

---

## Geração de relatórios com Allure

Os testes já estão configurados para gerar resultados em JSON e em HTML via Allure.

### Gerar o relatório HTML
```powershell
cd C:\WorkSpace\Repositorios\desafio-automacao-mobile
npx.cmd allure generate ./reports/allure-results --clean -o ./reports/allure-report
```

### Abrir o relatório localmente
```powershell
npx.cmd --yes http-server ./reports/allure-report -p 8000 -c-1 --silent
```

Depois acesse:
```text
http://localhost:8000
```

---

## Scripts prontos no projeto

No [package.json](package.json) há scripts úteis para execução rápida:

```powershell
npm test
npm run report
npm run test:report
npm run report:open
```

### Script recomendado para execução completa
```powershell
npm run test:report
```

Esse comando:
- apaga relatórios antigos
- executa a suíte
- gera o HTML do Allure
- abre a página de relatório localmente

---

## Dados de teste (data-driven)

Os dados dos testes ficam em arquivos JSON dentro de `test/data/massas/`, e são importados diretamente pela suíte.

Exemplo:
- `login.json`
- `cadastro.json`
- `formulario.json`

Esse padrão permite:
- reutilizar massas em vários cenários
- alterar dados sem mexer no código de automação
- executar cenários com diferentes entradas

---

## Observações importantes

- O projeto foi configurado para uso local com Android emulador.
- A criação da sessão mobile depende do emulador estar pronto e do Appium responder em `http://localhost:4723`.
- Os relatórios são armazenados em `reports/` e devem ser limpos antes de uma nova execução para manter o ambiente organizado.
- O app alvo é o `native-demo-app` da WebdriverIO, utilizado como base para a automação mobile.

---

## Fluxo recomendado de execução

1. Instalar Node.js, Java e Android SDK
2. Criar ou selecionar um emulador Android
3. Iniciar o emulador
4. Verificar `adb devices`
5. Iniciar o Appium
6. Validar `http://localhost:4723/status`
7. Executar `npm test`
8. Gerar relatório com `npm run report`
9. Abrir a página HTML localmente

---

## Resultado esperado

Ao final da execução, o projeto deve:
- abrir o app no emulador
- executar os cenários definidos
- gerar evidências em JSON e HTML
- permitir análise de falhas e acompanhamento dos testes


