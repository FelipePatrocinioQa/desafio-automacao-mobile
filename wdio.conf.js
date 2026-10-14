const path = require('path');

const appPath = process.env.DEMO_APP_APK ||
  'C:\\wdio-native-demo-app-v2.2.0\\apps\\release\\android.wdio.native.app.v2.2.0.apk';

exports.config = {
  runner: 'local',
  port: 4723,
  specs: ['./test/specs/desafio-mobile.spec.js'],
  exclude: [],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    timeout: 60000,
    ui: 'bdd'
  },
  services: [],
  appium: {
    args: {
      relaxedSecurity: true,
      logNoColors: true
    }
  },
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Medium_Phone_API_37.0',
      'appium:udid': process.env.ANDROID_UDID || 'emulator-5554',
      'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '37',
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.resolve(appPath),
      'appium:newCommandTimeout': 600,
      'appium:noReset': false
    }
  ],
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: './reports/allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
        addConsoleLogs: true
      }
    ]
  ],
  before: async function () {
    const { expect } = await import('chai');
    global.expect = expect;
  },
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (error) {
      await browser.takeScreenshot();
    }
  }
};
