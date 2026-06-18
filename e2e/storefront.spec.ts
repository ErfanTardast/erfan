import { expect, test, type Page } from '@playwright/test';

const oldBrandPattern = /Darya|DARYA|دریا رایس|daryarice/i;

async function gotoStorefront(page: Page, route: string) {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
}

test('homepage loads in RTL with Keyvan branding', async ({ page }) => {
  await gotoStorefront(page, '/');

  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByRole('main').getByText('Keyvan', { exact: true })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('کیوان');
  await expect(page.locator('body')).not.toContainText('Server Error');
  await expect(page.locator('body')).not.toContainText(oldBrandPattern);
});

test('shop page loads product cards without old branding', async ({ page }) => {
  await gotoStorefront(page, '/shop');

  await expect(page.locator('article').first()).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Server Error');
  await expect(page.locator('body')).not.toContainText(oldBrandPattern);
});

test('product page can add to cart and navigate checkout', async ({ page }) => {
  await gotoStorefront(page, '/product/tarom-hashemi-premium');

  await expect(page.locator('body')).not.toContainText('Server Error');
  const addToCart = page.getByTestId('pdp-add-to-cart');
  await expect(addToCart).toHaveAttribute('data-hydrated', 'true');
  await expect(addToCart).toBeEnabled();
  await addToCart.click();
  await expect(page.getByTestId('cart-drawer')).toBeVisible();
  await page.getByTestId('cart-checkout-link').click();
  await expect(page).toHaveURL(/\/checkout$/);
});

for (const route of ['/shipping', '/returns', '/faq', '/wholesale']) {
  test(`${route} support page loads`, async ({ page }) => {
    await gotoStorefront(page, route);

    await expect(page.locator('body')).not.toContainText('Server Error');
    await expect(page.locator('main')).toBeVisible();
  });
}

for (const route of ['/category/tarom', '/brand/keyvan-premium', '/use-case/guest-table']) {
  test(`${route} catalog landing page loads`, async ({ page }) => {
    await gotoStorefront(page, route);

    await expect(page.locator('body')).not.toContainText('Server Error');
    await expect(page.locator('article').first()).toBeVisible();
    await expect(page.locator('body')).not.toContainText(oldBrandPattern);
  });
}
