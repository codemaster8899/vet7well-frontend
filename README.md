# VET7.Well — Frontend (v2)

Vue 3 / Quasar frontend for **VET7.Well**, a veterinary wellness web application: user auth, dashboard, and API-backed patient/clinic workflows.

## About

SPA built with Quasar CLI (Vite), Pinia stores, Vue Router, and vue-i18n. Talks to a backend via Axios (`VITE_APP_API_URL`).

## Tech stack

- **Vue 3** + **TypeScript**
- **Quasar 2** (Vite)
- **Pinia** (+ persisted / shared state plugins)
- **Vue Router** + **vue-i18n** (EN / DE)
- **Axios** API client
- **Sentry** error tracking
- **ESLint** + **Prettier**

## Project structure

```
src/
  pages/        Screens (index, login, forgot password, dashboard)
  layouts/      Empty + main app shells
  components/   UI and user components
  stores/       Pinia stores (auth, common)
  services/     API service wrappers
  boot/         Quasar boot files (axios, i18n, …)
  i18n/         Locale messages (en, de)
  router/       Route definitions
  models/       Shared TypeScript models
```

## Getting started

```bash
npm install
npm run dev      # or: quasar dev
npm run build    # or: quasar build
npm run lint
npm run format
```

Optional Quasar CLI:

```bash
npm i -g @quasar/cli
quasar new component folder/MyComponent
quasar new page dirname/MyPage
quasar new layout MyLayout
```

Configure the API base URL (and related keys) via environment variables such as `VITE_APP_API_URL`.

## Author

**codemaster8899**
