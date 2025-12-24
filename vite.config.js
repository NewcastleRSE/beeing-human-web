import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { svelteTesting } from "@testing-library/svelte/vite";
// Let the Sentry Vite plugin load `.env.sentry-build-plugin` itself.

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: "ncl-rse",
        project: "beeing-human-web",
        release: {
          name: "beeing-human-web@" + process.env.npm_package_version,
        }

      },
    }),
    sveltekit(),
    svelteTesting(),
  ],
  test: {
    include: [
      "src/**/*.{test,spec}.{js,ts}",
      "tests/components/*.{test,spec}.{js,ts}",
      "tests/unit/*.{test,spec}.{js,ts}",
    ],
    environment: "jsdom",
    setupFiles: ["./vitest-setup.js"],
    hookTimeout: 25000,
  },
  define: {
    "__APP_VERSION__": JSON.stringify(process.env.npm_package_version),
    "__BUILD_DATE__": JSON.stringify(new Date().toISOString()),
  }
});
