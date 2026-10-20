import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, selectors } from 'playwright';
import { CustomWorld } from './world';
import { config } from '../utils/config';

let browser: Browser;

setDefaultTimeout(30 * 1000);

BeforeAll(async function () {
  selectors.setTestIdAttribute('data-test');
  browser = await chromium.launch({ headless: config.headless });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({ baseURL: config.baseURL });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  await this.page.close();
  await this.context.close();
});

AfterAll(async function () {
  await browser.close();
});