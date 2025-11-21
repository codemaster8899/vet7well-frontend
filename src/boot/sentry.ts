import { defineBoot } from '#q-app/wrappers';
import * as Sentry from '@sentry/vue';
import * as Integrations from '@sentry/integrations';
import { useRouter } from 'vue-router';

const router = useRouter();

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(async ({ app }) => {
  Sentry.init({
    app,
    dsn: 'https://0c114aef9aba15c393694a0a08f0b2ba@o4508093042458624.ingest.de.sentry.io/4508726604398672',
    // integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
    integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', /^https:\/\/api-dev\.7well\.net\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });

  app.use(router);
});
