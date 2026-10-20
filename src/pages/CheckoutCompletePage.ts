import { Page, Locator } from 'playwright';

export class CheckoutCompletePage {
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.completeHeader = page.getByTestId('complete-header');
  }
}