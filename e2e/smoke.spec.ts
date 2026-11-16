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
  await expect(page).toHaveURL(/\/[a-z]{3}-c\d\d\/?$/);
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

test('finishing a certification celebrates once, with the exam page, Who passed and sharing', async ({ page }) => {
  await page.goto('pt-br/clf-c02/');
  const card = page.locator('section.celebrate');
  await expect(card).toBeHidden();
  await page.evaluate(() => {
    const ids = [...document.querySelectorAll<HTMLElement>('.tiles a[data-known]')].flatMap((a) => a.dataset.known!.split(','));
    localStorage.setItem('easyreview:known:v1', JSON.stringify(Object.fromEntries(ids.map((id) => [id, Date.now()]))));
  });
  await page.reload();
  const dialog = page.locator('dialog[data-celebrate]');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link', { name: /Página da prova na AWS/ })).toHaveAttribute('href', /aws\.amazon\.com\/certification\/certified-cloud-practitioner/);
  await expect(dialog.getByRole('link', { name: /Passou\? Adicione-se/ })).toHaveAttribute('href', /CONTRIBUTING\.md#add-yourself/);
  await dialog.locator('[data-share] summary').click();
  const x = new URL((await dialog.getByRole('link', { name: /^X/ }).getAttribute('href'))!);
  expect(x.searchParams.get('text')).toMatch(/^Concluí todos os tópicos da AWS Certified Cloud Practitioner \(CLF-C02\)/);
  await dialog.locator('[data-celebrate-close]').click();
  await expect(dialog).toBeHidden();
  await expect(card).toBeVisible();
  await page.reload();
  await expect(card).toBeVisible();
  await expect(dialog).toBeHidden();
});

test('the study path points to the next topic and keeps the exam-domain view', async ({ page }) => {
  await page.goto('pt-br/clf-c02/');
  const next = page.locator('[data-roadmap-next]');
  await expect(next).toHaveText(/Comece por /);
  const first = page.locator('[data-roadmap-unit]').first();
  await expect(first).toHaveClass(/is-next/);
  await first.click();
  await page.getByRole('button', { name: /Marcar tudo como sabido/ }).click();
  await page.goto('pt-br/clf-c02/');
  await expect(next).toHaveText(/Continue com /);
  await expect(page.locator('[data-roadmap-unit]').first()).toHaveClass(/is-known/);
  await page.getByRole('tab', { name: /Por domínio da prova/ }).click();
  await expect(page.locator('#view-domains')).toBeVisible();
  await expect(page.locator('#view-roadmap')).toBeHidden();
});

test('a finished topic can be shared with its name and link', async ({ page }) => {
  await page.goto('pt-br/clf-c02/iam/');
  const share = page.locator('.unit-head [data-share]');
  await expect(share).toBeHidden();
  await page.getByRole('button', { name: /Marcar tudo como sabido/ }).click();
  await share.locator('summary').click();
  const x = new URL((await share.getByRole('link', { name: /^X/ }).getAttribute('href'))!);
  expect(x.searchParams.get('text')).toMatch(/^Concluí o tópico IAM da AWS Certified Cloud Practitioner \(CLF-C02\)/);
  expect(x.searchParams.get('url')).toMatch(/\/easyreview\/pt-br\/clf-c02\/iam\/$/);
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

test('every header tool is reachable on any screen', async ({ page, isMobile }) => {
  await page.goto('dop-c02/codedeploy/');
  if (isMobile) await page.getByRole('button', { name: 'More tools' }).click();
  await page.getByRole('link', { name: 'Flashcards' }).first().click();
  await expect(page).toHaveURL(/\/dop-c02\/flashcards\/?$/);
});

test('header menus open one at a time and close on Escape', async ({ page, isMobile }) => {
  await page.goto('dop-c02/codedeploy/');
  const remind = page.locator('[data-remind]');
  const transfer = page.locator('[data-transfer]');
  if (isMobile) await page.getByRole('button', { name: 'More tools' }).click();
  await remind.locator('summary').click();
  await expect(remind).toHaveAttribute('open', '');
  await transfer.locator('summary').click();
  await expect(transfer).toHaveAttribute('open', '');
  await expect(remind).not.toHaveAttribute('open');
  if (isMobile) {
    // The sidebar replaces the tools list and its panel.
    await page.locator('[data-menu]').click();
    await expect(page.locator('[data-sidebar]')).toHaveClass(/\bopen\b/);
    await expect(transfer).not.toHaveAttribute('open');
    await expect(page.locator('[data-tools]')).not.toHaveClass(/\bopen\b/);
  }
  await page.keyboard.press('Escape');
  await expect(transfer).not.toHaveAttribute('open');
  await expect(page.locator('[data-sidebar]')).not.toHaveClass(/\bopen\b/);
});

// Translations run longer than English, so every locale is checked on a narrow phone.
const narrowPages = ['', 'dop-c02/', 'dop-c02/codedeploy/', 'dop-c02/flashcards/', 'dop-c02/coverage/', 'search/', 'passed/'];
for (const locale of ['', 'pt-br/']) {
  test(`${locale || 'en/'} pages fit a 320px screen without sideways scroll`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    for (const path of narrowPages) {
      await page.goto(locale + path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${locale}${path} scrolls sideways`).toBe(0);
    }
  });
}

// Sections are shared across certs, so a link to another unit must stay in the cert the reader is studying.
for (const path of ['dop-c02/lambda/', 'clf-c02/ec2/', 'pt-br/dop-c02/lambda/']) {
  test(`unit links on ${path} stay in the page's cert`, async ({ page }) => {
    await page.goto(path);
    const strays = await page.evaluate(() => {
      const certPath = location.pathname.replace(/[^/]+\/$/, '');
      const covered = new Set([...document.querySelectorAll<HTMLAnchorElement>('a:not(.unit-link)')].map((a) => a.pathname).filter((p) => p.startsWith(certPath)));
      return [...document.querySelectorAll<HTMLAnchorElement>('a.unit-link')]
        .filter((a) => covered.has(`${certPath}${a.dataset.unit}`) || covered.has(`${certPath}${a.dataset.unit}/`))
        .filter((a) => !a.pathname.startsWith(certPath))
        .map((a) => a.pathname);
    });
    expect(strays).toEqual([]);
  });
}

test('the Portuguese site renders in Portuguese and switches back to English', async ({ page, isMobile }) => {
  await page.goto('pt-br/dop-c02/codedeploy/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.getByRole('button', { name: /Marcar tudo como sabido/ })).toBeVisible();
  if (isMobile) await page.getByRole('button', { name: 'Mais ferramentas' }).click();
  await page.locator('[data-lang] summary').click();
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/easyreview\/dop-c02\/codedeploy\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
