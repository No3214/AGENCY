import { test, expect } from '@playwright/test';

test('dates page lists upcoming shows', async ({ page }) => {
  await page.goto('/en/dates');
  await expect(page.locator('.board')).toBeVisible();
  await expect(page.getByText('İzmir').first()).toBeVisible();
});

test('about page shows stats', async ({ page }) => {
  await page.goto('/en/about');
  await expect(page.locator('h1.page-title')).toBeVisible();
  await expect(page.locator('.stat').first()).toBeVisible();
});

test('unknown artist returns 404', async ({ page }) => {
  const res = await page.goto('/en/artists/does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByText('404')).toBeVisible();
});

test('all four artist EPKs are reachable', async ({ page }) => {
  for (const slug of ['after-papi', 'mira-solace', 'kavi', 'lunaria']) {
    const res = await page.goto(`/en/artists/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  }
});

test('mobile menu toggles', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/en');
  const burger = page.locator('.nav-burger');
  await expect(burger).toBeVisible();
  await burger.click();
  await expect(page.locator('header.nav').getByRole('link', { name: 'Roster', exact: true })).toBeVisible();
});

test('Turkish dates page renders localized header', async ({ page }) => {
  await page.goto('/tr/dates');
  await expect(page.locator('h1.page-title')).toContainText('kalkış', { ignoreCase: true });
});

test('robots.txt and sitemap.xml are served', async ({ page }) => {
  const robots = await page.request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap');
  const sitemap = await page.request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('/en');
});

test('security headers and CSP nonce are present', async ({ page }) => {
  const res = await page.request.get('/en');
  const h = res.headers();
  const csp = h['content-security-policy'] || '';
  const scriptSrc = (csp.match(/script-src[^;]*/) || [''])[0];
  expect(scriptSrc).toContain("'nonce-");
  expect(scriptSrc).toContain("'strict-dynamic'");
  expect(scriptSrc).not.toContain('unsafe-inline');
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['strict-transport-security']).toContain('max-age');
});

test('footer exposes the booking email', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute('href', /bookings@/);
});

test('opengraph image is generated', async ({ page }) => {
  const res = await page.request.get('/opengraph-image');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('image/png');
});
