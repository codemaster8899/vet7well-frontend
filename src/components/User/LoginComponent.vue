<template>
  <q-card class="login-card">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-card-section class="bg-primary text-white">
        <div class="flex justify-between items-center vertical-middle text-h6">
          {{ $t('form.login') }}
          <q-avatar><img src="/icons/favicon-32x32.png" /></q-avatar>
        </div>
      </q-card-section>
      <q-card-section>
        <q-input outlined v-model="formData.email" :label="$t('form.email')" :rules="[(val) => (val && val.length > 3) || $t('validation.email')]" />
        <q-input outlined v-model="formData.password" :label="$t('form.password')" :rules="[(val) => (val && val.length > 1) || $t('validation.password')]" type="password" />
        <a href="/user/login">{{ $t('form.login') }}</a>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" type="submit">{{ $t('form.submit') }}</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { apiService } from 'src/services/ApiService';
import { Dialog, Notify } from 'quasar';
import { i18n } from 'boot/i18n';
import { useUserAuthStore } from 'stores/UserAuth.store';
import { useRouter } from 'vue-router';
import { LoginResponseModel } from 'src/models/LoginResponseModel';

const formData = ref({
  email: '',
  password: '',
});

const router = useRouter();

async function onSubmit() {
  const response = await apiService.post<LoginResponseModel>('/user/login', formData.value);
  if (!response) {
    Dialog.create({
      title: i18n.global.t('common.error'),
      message: i18n.global.t('validation.loginFailed'),
    });
  } else {
    Notify.create({
      message: i18n.global.t('validation.loginSuccess'),
      color: 'green',
      position: 'top',
      icon: 'fa-solid fa-check-circle',
      timeout: 1000,
    });
    useUserAuthStore().updateTokens({
      v7wUserAccessToken: response.token,
      v7wUserAuthenticated: 'true',
      v7wUserData: response.user,
    });
    setTimeout(() => {
      router.push({ path: '/dashboard' });
    }, 1000);
  }
}
</script>
<style lang="css" scoped>
.login-card {
  width: 400px;
  margin: 0 auto;
}
</style>
