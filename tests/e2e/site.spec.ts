import { test, expect } from '@playwright/test';

test('root redirects to /en and shows the hero', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('h1.hero-title')).toHaveText('AFTERHOUSE');
});

test('roster navigation works', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('link', { name: 'Roster', exact: true }).first().click();
  await expect(page).toHaveURL(/\/en\/roster$/);
  await expect(page.getByText('After Papi').first()).toBeVisible();
});

test('EN/TR language toggle switches locale', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('link', { name: 'TR', exact: true }).click();
  await expect(page).toHaveURL(/\/tr$/);
  await expect(page.getByText('Kadro').first()).toBeVisible();
});

test('artist EPK page renders', async ({ page }) => {
  await page.goto('/en/artists/after-papi');
  await expect(page.locator('h1')).toContainText('After Papi');
  await expect(page.getByRole('link', { name: /Book this artist/i }).first()).toBeVisible();
});

test('booking form submits successfully', async ({ page }) => {
  await page.goto('/en/book');
  await page.fill('input[name="name"]', 'E2E Bot');
  await page.fill('input[name="email"]', 'e2e@example.com');
  await page.fill('textarea[name="message"]', 'Automated end-to-end verification message for the booking flow.');
  await page.getByRole('button', { name: /Send inquiry/i }).click();
  await expect(page.locator('.form-ok')).toBeVisible();
});
