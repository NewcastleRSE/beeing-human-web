import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: "ncl-rse",
        project: "beeing-human-web",
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
});
