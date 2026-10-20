import { Page, Locator } from 'playwright';

export class CheckoutOverviewPage {
  private readonly finishButton: Locator;

  constructor(page: Page) {
    this.finishButton = page.getByTestId('finish');
  }

  async finishPurchase(): Promise<void> {
    await this.finishButton.click();
  }
}