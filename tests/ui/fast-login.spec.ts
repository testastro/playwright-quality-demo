import {test, expect} from '@playwright/test';

test('fast login shows Products page', async ({ page }) => {
  await page.context().addCookies([
    {name: 'session-username', value: 'standard_user', domain: 'www.saucedemo.com', path: '/'}
  ]);
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText("Products")).toBeVisible();
});