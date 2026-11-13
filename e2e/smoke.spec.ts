import { expect, test } from '@playwright/test';

// The critical paths a reader takes; unit tests cover the logic behind them.
let errors: string[] = [];
test.beforeEach(({ page }) => {
  errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
});
test.afterEach(() => {
  expect(errors, 'uncaught errors on the page').toEqual([]);
});

test('home links to the first available certification', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('once');
  await page.getByRole('link', { name: /^Start / }).click();
  await expect(page).toHaveURL(/\/dop-c02\/?$/);
});

test('a unit page renders sections, diagrams and doc sources', async ({ page }) => {
  await page.goto('dop-c02/codedeploy/');
  await expect(page.getByRole('heading', { level: 1, name: 'CodeDeploy' })).toBeVisible();
  await expect(page.locator('[data-diagram] svg').first()).toBeAttached();
  await expect(page.locator('a[href^="https://docs.aws.amazon.com/"]').first()).toBeAttached();
});

test('marking a section as known survives a reload', async ({ page }) => {
  await page.goto('dop-c02/codedeploy/');
  await page.getByRole('button', { name: /Mark all as known/ }).click();
  await page.reload();
  await expect(page.locator('[data-known-count]').first()).not.toHaveText(/^0\//);
});

test('a flashcard flips and can be graded', async ({ page }) => {
  await page.goto('dop-c02/flashcards/');
  await page.getByRole('button', { name: 'Answer' }).click();
  await page.locator('[data-grade="good"]').click();
  const saved = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('easyreview:progress:v1') ?? '{}')).length);
  expect(saved).toBe(1);
});

test('search finds sections', async ({ page }) => {
  await page.goto('search/');
  await page.locator('[data-search]').fill('blue green');
  await expect(page.locator('[data-results] li a').first()).toBeVisible();
});

test('who passed lists people from Credly', async ({ page }) => {
  await page.goto('passed/');
  await expect(page.locator('.person').first()).toBeVisible();
});
