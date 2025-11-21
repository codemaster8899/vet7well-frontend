<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="form-card-container">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section class="bg-primary text-white">
          <div class="flex justify-between items-center vertical-middle text-h6">
            {{ $t('form.forgotPassword') }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-input outlined v-model="email" :label="$t('form.email')" :rules="[(val) => (val && val.length > 3) || $t('validation.email')]" />
          <a href="/user/forgotPassword">{{ $t('form.forgotPassword') }}</a>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn color="primary" type="submit">{{ $t('form.submit') }}</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { apiService } from 'src/services/ApiService';
import { Dialog, useQuasar } from 'quasar';
import { i18n } from 'boot/i18n';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();

const email = ref('');
async function onSubmit() {
  const response = await apiService.post('/user/forgotPassword', { email: email.value });
  console.log(response);
  if (!response) {
    $q.dialog({
      title: i18n.global.t('common.error'),
      message: i18n.global.t('validation.forgotPassword.emailNotFound'),
    });
  } else {
    $q.dialog({
      title: i18n.global.t('common.success'),
      message: i18n.global.t('validation.forgotPassword.emailSent'),
    }).onOk(() => {
      // Redirect to login page
      console.log('ok clicked');
      router.push({ path: '/user/login' });
    });
  }
}
</script>
