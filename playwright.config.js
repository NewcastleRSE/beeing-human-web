/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  testIgnore: '/components/*',
  // Run all tests in parallel.
  fullyParallel: true,
  // Reporter to use
  reporter: 'html',
};

export default config;
