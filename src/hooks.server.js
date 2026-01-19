import { sequence } from "@sveltejs/kit/hooks";
import { handleErrorWithSentry, sentryHandle } from "@sentry/sveltekit";
import * as Sentry from "@sentry/sveltekit";
import { dev, version, building } from '$app/environment';

// Skip Sentry initialization during build to avoid response body issues during prerender
if (!building) {
  Sentry.init({
    dsn: "https://1ea84acbc97aa9b2311ff0d2e362c3a8@o1080315.ingest.us.sentry.io/4509010253971456",

    tracesSampleRate: 1.0,

    release: "beeing-human-web@" + version,

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: import.meta.env.DEV,
    environment: dev ? "development" : "production",
  });
}

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
// Skip sentryHandle during build to prevent response body consumption issues
export const handle = !building ? sequence(sentryHandle()) : undefined;

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = !building ? handleErrorWithSentry() : undefined;