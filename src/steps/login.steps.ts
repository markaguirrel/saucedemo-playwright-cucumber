import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

Given('el usuario está en la página de inicio de sesión', async function (this: CustomWorld) {
  await new LoginPage(this.page).open();
});

When(
  'el usuario inicia sesión con usuario {string} y contraseña {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await new LoginPage(this.page).login(username, password);
  },
);

Then('el usuario debería ver la página de productos', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/inventory\.html/);
  await expect(new InventoryPage(this.page).title).toHaveText('Products');
});

Then('el usuario debería ver el mensaje de error {string}', async function (this: CustomWorld, message: string) {
  await expect(new LoginPage(this.page).errorMessage).toHaveText(message);
});