import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [{ path: '/', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/user',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/User/LoginPage.vue') },
      { path: 'forgotPassword', component: () => import('pages/User/ForgotPasswordPage.vue') },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DashboardPage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
