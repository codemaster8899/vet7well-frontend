import { defineBoot } from '#q-app/wrappers';
import { createI18n } from 'vue-i18n';

/**
 * Load locale messages dynamically from separate files
 * if you add new locales, you need to add them to locales array
 * if you add new files, you need to add them to files array
 */
async function loadLocaleMessages() {
  const locales = ['en', 'de'];
  const files = ['common', 'form', 'validation'];
  const messages: any = {};

  for (const locale of locales) {
    for (const file of files) {
      const msg = await import(`src/i18n/${locale}/${file}.json`).then((m: any) => m.default);
      messages[locale] = { ...messages[locale], ...msg };
    }
  }

  return messages;
}
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  messages: await loadLocaleMessages(),
});

export default defineBoot(async ({ app }) => {
  // Set i18n instance on app
  app.use(i18n as any);
});

export { i18n };
