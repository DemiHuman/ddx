import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
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
