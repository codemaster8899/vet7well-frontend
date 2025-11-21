<template>
  <q-header bordered>
    <q-toolbar>
      <q-btn flat dense round icon="fa-solid fa-bars" aria-label="Menu" @click="toggleLeftDrawer" v-if="props.fullHeader" />
      <q-toolbar-title>
        <q-avatar>
          <img src="/icons/favicon-32x32.png" />
        </q-avatar>
        VET7.Well
      </q-toolbar-title>
      <q-btn flat dense round icon="fa-solid fa-circle-half-stroke" aria-label="Menu" @click="toggleDarkMode" />
      <q-select v-model="locale" :options="localeOptions" :label="$t('common.selectLanguage')" hide-bottom-space dense square outlined emit-value map-options options-dense popup-content-class="bg-primary" dark style="min-width: 175px" label-color="grey-1" color="grey-1" />
      <q-btn-dropdown class="glossy" color="primary" icon="fa-solid fa-user" push v-if="props.fullHeader">
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Settings</div>
          </div>
          <q-separator vertical inset class="q-mx-lg" />
          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>
            <q-btn color="primary" label="Logout" push size="sm" v-close-popup @click="logout()" />
          </div>
        </div>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCommonStore } from 'stores/common.store';
import { useQuasar } from 'quasar';
import { useUserAuthStore } from 'stores/UserAuth.store';
import { useRouter } from 'vue-router';

const { locale } = useI18n({ useScope: 'global' });
const { t } = useI18n();

const commonStore = useCommonStore();
const $q = useQuasar();

const router = useRouter();

const localeOptions = computed(() => {
  return useI18n().availableLocales.map((locale) => {
    return {
      label: t(locale),
      value: locale,
    };
  });
});

const props = defineProps({
  fullHeader: { type: Boolean, required: false },
});

function toggleLeftDrawer() {
  commonStore.leftDrawerOpen = !commonStore.leftDrawerOpen;
}

function toggleDarkMode() {
  // commonStore.darkMode = !commonStore.darkMode;
  commonStore.darkMode = $q.dark.isActive;
  $q.dark.set(!commonStore.darkMode);
}

function logout() {
  useUserAuthStore().logout();
  $q.loading.show();
  setTimeout(() => {
    router.push({ path: '/' });
    $q.loading.hide();
  }, 1000);
}
</script>
