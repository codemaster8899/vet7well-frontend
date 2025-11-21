<template>
  <q-footer reveal bordered class="bg-grey-2 text-grey-7">
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-body2 q-pb-none self-center q-my-sm">&copy; VET7.well {{ thisYear }}</div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
const thisYear = new Date().getFullYear();
</script>
