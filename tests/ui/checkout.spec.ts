import { test, expect } from '@playwright/test';
test.describe('Checkout',()=>{
    test('check out product completed', { tag: '@smoke' }, async ({ page }) => {
        await(page.goto('https://www.saucedemo.com/'));
        await(page.getByPlaceholder('Username').fill('standard_user'));
        await(page.getByPlaceholder('Password').fill('secret_sauce'));
        await(page.getByTestId('login-button').click());
        await(page.getByTestId('add-to-cart-sauce-labs-backpack').click());
        await(page.getByTestId('shopping-cart-link').click());
        await(page.getByRole('button', { name: 'Checkout' }).click());
        await(page.getByPlaceholder('First Name').fill('Hung'));
        await(page.getByPlaceholder('Last Name').fill('Phan'));
        await(page.getByPlaceholder('Zip/Postal Code').fill('12345'));
        await(page.getByRole('button', { name: 'Continue' }).click());
        await(page.getByRole('button', { name: 'Finish' }).click());
        await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    });  
});