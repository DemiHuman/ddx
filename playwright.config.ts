import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: [
    "tests/**/**.test.ts"
  ],
  testIgnore: [
    "first.test.ts"
  ],
  fullyParallel: true,
  use: {
    headless: true,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'off',
  },
  reporter: [
    ['line'], 
    ['json', { outputFile: 'test-result.json'}],
    ['html', {
      open: 'never',
      outputFolder: 'playwright-report/'
    }],
    ["allure-playwright", {
        detail: false,
        outputFolder: "my-allure-results",
        suiteTitle: true
    }]
  ],

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
