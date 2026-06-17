import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const localChromiumCandidates = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean) as string[];

const localChromium = localChromiumCandidates.find((path) => existsSync(path));

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 7_500 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    launchOptions: localChromium ? { executablePath: localChromium } : undefined,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      BUILD_TARGET: '',
      GITHUB_PAGES: '',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
