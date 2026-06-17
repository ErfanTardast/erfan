import { expect, test } from '@playwright/test';

const oldBrandPattern = /Darya|DARYA|دریا رایس|daryarice/i;

test('homepage loads in RTL with Keyvan branding', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('main').getByText('Keyvan', { exact: true })).toBeVisible();
  await expect(page.getByText('KEYVAN', { exact: true })).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Server Error');
  await expect(page.locator('body')).not.toContainText(oldBrandPattern);
});

test('shop page loads product cards without old branding', async ({ page }) => {
  await page.goto('/shop');

  await expect(page.locator('article').first()).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Server Error');
  await expect(page.locator('body')).not.toContainText(oldBrandPattern);
});

test('product page can add to cart and navigate checkout', async ({ page }) => {
  await page.goto('/product/tarom-hashemi-premium');

  await expect(page.locator('body')).not.toContainText('Server Error');
  await page.getByTestId('pdp-add-to-cart').click();
  await expect(page.getByTestId('cart-drawer')).toBeVisible();
  await page.getByTestId('cart-checkout-link').click();
  await expect(page).toHaveURL(/\/checkout$/);
});

for (const route of ['/shipping', '/returns', '/faq']) {
  test(`${route} support page loads`, async ({ page }) => {
    await page.goto(route);

    await expect(page.locator('body')).not.toContainText('Server Error');
    await expect(page.locator('main')).toBeVisible();
  });
}

for (const route of ['/category/tarom', '/brand/keyvan-premium', '/use-case/guest-table']) {
  test(`${route} catalog landing page loads`, async ({ page }) => {
    await page.goto(route);

    await expect(page.locator('body')).not.toContainText('Server Error');
    await expect(page.locator('article').first()).toBeVisible();
    await expect(page.locator('body')).not.toContainText(oldBrandPattern);
  });
}
