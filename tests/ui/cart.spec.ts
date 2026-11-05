import{test,expect} from '@playwright/test';
test.describe('Cart',()=>{
    test.beforeEach(async ({ page }) => {
        await(page.goto('https://www.saucedemo.com/'));
        await(page.getByPlaceholder('Username').fill('standard_user'));
        await(page.getByPlaceholder('Password').fill('secret_sauce'));
        await(page.getByTestId('login-button').click());
    });
    test('Add item to cart show badge 1',async({page})=>{
        await(page.getByTestId('add-to-cart-sauce-labs-backpack').click());
        await expect (page.getByTestId('shopping-cart-badge')).toHaveText('1');
    });
    test('Remove items from cart hides badge',async({page})=>{
        await(page.getByTestId('add-to-cart-sauce-labs-backpack').click());
        await(page.getByTestId('remove-sauce-labs-backpack').click());
        await expect (page.getByTestId('shopping-cart-badge')).toHaveCount(0);
    })        
});