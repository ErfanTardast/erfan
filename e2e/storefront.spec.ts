import { expect, test, type Page } from '@playwright/test';

const oldBrandPattern = /Darya|DARYA|دریا رایس|daryarice/i;

async function gotoStorefront(page: Page, route: string) {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
}

test('homepage loads in RTL with Keyvan branding', async ({ page }) => {
  await gotoStorefront(page, '/');

  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByText('Keyvan', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('main')).toContainText('کیوان');
  await expect(page.locator('body')).not.toContainText('Server Error');
  await expect(page.locator('body')).not.toContainText(oldBrandPattern);
  await expect(page.getByRole('heading', { level: 1, name: /برنج اصیل شمال/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'ورود به فروشگاه' }).first()).toBeVisible();
});

test('homepage exposes shop and cart actions immediately', async ({ page }) => {
  await gotoStorefront(page, '/');

  await expect(page.getByRole('link', { name: 'ورود به فروشگاه' })).toHaveAttribute('href', '/shop');
  await expect(page.getByRole('link', { name: /طارم هاشمی ممتاز/ })).toHaveAttribute(
    'href',
    '/product/tarom-hashemi-premium'
  );
  const cartButton = page.getByRole('button', { name: 'سبد خرید' });
  await expect(cartButton).toHaveAttribute('data-hydrated', 'true');
  await cartButton.click();
  await expect(page.getByTestId('cart-drawer')).toBeVisible();
});

test('homepage is responsive and respects reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await gotoStorefront(page, '/');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.getByRole('link', { name: 'ورود به فروشگاه' })).toBeVisible();
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

test('local checkout request completes without claiming a real payment', async ({ page }) => {
  await gotoStorefront(page, '/product/tarom-hashemi-premium');
  await page.getByTestId('pdp-add-to-cart').click();
  await page.getByTestId('cart-checkout-link').click();

  await page.getByLabel(/نام و نام‌خانوادگی/).fill('رضا محمدی');
  await page.getByLabel(/شماره موبایل/).fill('09123456789');
  await page.getByRole('button', { name: /ادامه — آدرس تحویل/ }).click();

  await page.getByLabel(/استان/).fill('تهران');
  await page.getByLabel(/شهر/).fill('تهران');
  await page.getByLabel(/آدرس دقیق/).fill('خیابان ولیعصر، کوچه نمونه، پلاک ۱۲');
  await page.getByRole('button', { name: /ادامه — انتخاب پرداخت/ }).click();

  await expect(page.getByText(/درگاه آنلاین هنوز متصل نشده است/)).toBeVisible();
  await page.getByRole('button', { name: /ثبت درخواست سفارش —/ }).click();
  await expect(page.getByRole('heading', { name: 'درخواست سفارش ذخیره شد' })).toBeVisible();
});

test('local account signup opens the customer account', async ({ page }) => {
  await gotoStorefront(page, '/login');
  const signupTab = page.getByTestId('account-tab-signup');
  await expect(signupTab).toHaveAttribute('data-hydrated', 'true');
  await signupTab.click();
  await page.locator('#account-name').fill('کاربر کیوان');
  await page.locator('#account-email').fill('customer@example.com');
  await page.locator('#account-phone').fill('09121111111');
  await page.locator('#account-password').fill('local-password');
  await page.getByRole('button', { name: /ساخت حساب/ }).click();
  await expect(page).toHaveURL(/\/account$/);
  await expect(page.getByRole('heading', { name: 'کاربر کیوان' })).toBeVisible();
});

test('about and recipes use local Keyvan imagery', async ({ page }) => {
  for (const route of ['/about', '/recipes']) {
    await gotoStorefront(page, route);
    const sources = await page.locator('main img').evaluateAll((images) =>
      images.map((image) => (image as HTMLImageElement).currentSrc || (image as HTMLImageElement).src)
    );
    expect(sources.length).toBeGreaterThan(0);
    expect(sources.every((source) => !source.includes('images.unsplash.com'))).toBe(true);
  }
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
