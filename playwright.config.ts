import { defineConfig, devices } from '@playwright/test';

// Smoke test of the built site: run `npm run build` first.
export default defineConfig({
  testDir: 'e2e',
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4321/easyreview/' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
  webServer: { command: 'npm run preview', url: 'http://localhost:4321/easyreview/', reuseExistingServer: !process.env.CI },
});
