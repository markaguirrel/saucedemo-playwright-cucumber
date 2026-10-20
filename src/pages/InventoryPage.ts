import { Page, Locator } from 'playwright';

export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async addProductToCart(productName: string): Promise<void> {
    const productSlug = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.getByTestId(`add-to-cart-${productSlug}`).click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}