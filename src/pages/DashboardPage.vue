<template>
  <q-page padding>
    <!-- content -->daashboard
    <q-btn @click="throwError()" label="error" />
  </q-page>
</template>

<script setup lang="ts">
function throwError() {
  // throw new Error('Sentry Error');
}
</script>
