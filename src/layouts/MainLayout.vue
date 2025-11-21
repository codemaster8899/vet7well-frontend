<template>
  <q-layout view="hHh lpR fFf">
    <Header :fullHeader="true" />
    <LeftDrawer />
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>
<script setup lang="ts">
import Footer from 'components/UI/Footer.vue';
import LeftDrawer from 'components/UI/LeftDrawer.vue';
import Header from 'components/UI/Header.vue';
</script>
