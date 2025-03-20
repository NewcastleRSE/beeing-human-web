import { sequence } from "@sveltejs/kit/hooks";
import { handleErrorWithSentry, sentryHandle } from "@sentry/sveltekit";
import * as Sentry from "@sentry/sveltekit";
import { dev, version } from '$app/environment';

Sentry.init({
  dsn: "https://1ea84acbc97aa9b2311ff0d2e362c3a8@o1080315.ingest.us.sentry.io/4509010253971456",

  tracesSampleRate: 1.0,

  release: "beeing-human-web@" + version,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: import.meta.env.DEV,
  environment: dev ? "development" : "production",
});

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle());

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();