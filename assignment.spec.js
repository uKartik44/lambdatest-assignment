const { test, expect } = require('@playwright/test');


test.use({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
});


test.describe.configure({ mode: 'parallel' });

test.describe('Amazon Cart Tests', () => {

    test('Test Case 1 - iPhone', async ({ page }) => {
        const searchTerm = 'iPhone';

        //  Step 1: Navigate to Amazon
        await page.goto('https://www.amazon.in');

        await page.fill('#twotabsearchtextbox', 'iPhone');
        await page.press('#twotabsearchtextbox', 'Enter');

        // Step 2:First product 
        const firstProduct = page.locator('xpath=/html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[5]/div/div/span/div/div/div/div[2]/div/div/div[1]/a');

        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            firstProduct.click()
        ]);

        await newPage.waitForLoadState();


        // Step 3: Add to Cart
        await newPage.getByRole('button', { name: 'Add to cart' }).click();

        // Step 4: Get Subtotal
        await newPage.waitForSelector('#sw-subtotal', { state: 'visible', timeout: 10000 });
        const subtotal = await newPage.locator('#sw-subtotal .a-offscreen').innerText();
        console.log(`Cart Subtotal Value: ${subtotal}`);
    });


    test('Test Case 2 - Galaxy', async ({ page }) => {
        const searchTerm = 'Galaxy';

        //  Step 1: Navigate to Amazon
        await page.goto('https://www.amazon.in');

        await page.fill('#twotabsearchtextbox', 'Galaxy');
        await page.press('#twotabsearchtextbox', 'Enter');

        // Step 2:First product 
        const firstProduct = page.locator('xpath=/html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[5]/div/div/span/div/div/div/div[2]/div/div/div[1]/a');

        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            firstProduct.click()
        ]);

        await newPage.waitForLoadState();


        // Step 3: Add to Cart
        await newPage.getByRole('button', { name: 'Add to cart' }).click();

        // Step 4: Get Subtotal
        await newPage.waitForSelector('#sw-subtotal', { state: 'visible', timeout: 10000 });
        const subtotal = await newPage.locator('#sw-subtotal .a-offscreen').innerText();
        console.log(`Cart Subtotal Value: ${subtotal}`);
    });

});
