 import { LoginPage } from '../../pages/LoginPage';
import { test, expect } from '@playwright/test';

test('login with valid user shows Products page', { tag: '@smoke' }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
  await expect(page.getByText("Products")).toBeVisible();
});

test('login with locked user shows error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByTestId('error')).toContainText('locked out');
});