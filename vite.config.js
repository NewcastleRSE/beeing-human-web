import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}", "tests/components/*.{test,spec}.{js,ts}", "tests/unit/*.{test,spec}.{js,ts}"],
    environment: 'jsdom',
    alias: [
      { find: /^svelte$/, replacement: "svelte/internal" }
    ],
    hookTimeout: 25000,
  },
});
