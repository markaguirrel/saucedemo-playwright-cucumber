import { Page, Locator } from 'playwright';

export class CartPage {
  readonly itemNames: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}