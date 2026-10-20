import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { getUser } from '../utils/users';

Given('el usuario ha iniciado sesión como {string}', async function (this: CustomWorld, userKey: string) {
  const user = getUser(userKey);
  const loginPage = new LoginPage(this.page);
  await loginPage.open();
  await loginPage.login(user.username, user.password);
});

When('el usuario agrega el producto {string} al carrito', async function (this: CustomWorld, productName: string) {
  await new InventoryPage(this.page).addProductToCart(productName);
});

When('el usuario agrega los siguientes productos al carrito:', async function (this: CustomWorld, dataTable: DataTable) {
  const inventoryPage = new InventoryPage(this.page);
  for (const productName of dataTable.raw().flat()) {
    await inventoryPage.addProductToCart(productName);
  }
});

Then('el contador del carrito debería mostrar {string}', async function (this: CustomWorld, count: string) {
  await expect(new InventoryPage(this.page).cartBadge).toHaveText(count);
});

When('el usuario accede al carrito de compras', async function (this: CustomWorld) {
  await new InventoryPage(this.page).goToCart();
});

Then('el usuario debería ver los siguientes productos en el carrito:', async function (this: CustomWorld, dataTable: DataTable) {
  await expect(new CartPage(this.page).itemNames).toHaveText(dataTable.raw().flat());
});

When('el usuario procede al checkout', async function (this: CustomWorld) {
  await new CartPage(this.page).proceedToCheckout();
});

When(
  'el usuario ingresa sus datos de envío con nombre {string}, apellido {string} y código postal {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    await new CheckoutInfoPage(this.page).fillShippingInformation(firstName, lastName, postalCode);
  },
);

When('el usuario finaliza la compra', async function (this: CustomWorld) {
  await new CheckoutOverviewPage(this.page).finishPurchase();
});

Then('el usuario debería ver el mensaje de confirmación {string}', async function (this: CustomWorld, message: string) {
  await expect(new CheckoutCompletePage(this.page).completeHeader).toHaveText(message);
});