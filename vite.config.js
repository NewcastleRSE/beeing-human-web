import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { svelteTesting } from "@testing-library/svelte/vite";
import dotenv from "dotenv";


dotenv.config();

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: "ncl-rse",
        project: "beeing-human-web",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        release: {
          name: "being-human-web@" + process.env.npm_package_version,
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
});
