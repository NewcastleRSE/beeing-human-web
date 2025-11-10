/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: "npm run build && npm run preview",
    // port: 4173,
    url: 'http://localhost:4173',
    timeout: 120 * 1000,
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  testIgnore: ['/components/*', '/unit/*'],
  // Run all tests in parallel.
  fullyParallel: true,
  // Reporter to use
  reporter: process.env.CI ? 'html' : 'list',
  retries: 1,
  use: {
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    baseURL: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
