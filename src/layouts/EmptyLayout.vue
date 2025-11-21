<template>
  <q-layout view="hHh lpR fFf">
    <Header />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>
<script setup lang="ts">
import Header from 'components/UI/Header.vue';
import Footer from 'components/UI/Footer.vue';
</script>
