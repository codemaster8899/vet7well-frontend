<template>
  <q-page class="row items-center justify-evenly">
    <i class="fa-solid fa-spinner"></i>
  </q-page>
</template>
<script setup lang="ts">
import { useUserAuthStore } from 'stores/UserAuth.store';
import { useRouter } from 'vue-router';

const userAuthStore = useUserAuthStore();
const router = useRouter();

if (userAuthStore.v7wUserAuthenticated) {
  router.push({ path: '/dashboard' });
} else {
  router.push({ path: '/user/login' });
}
</script>
