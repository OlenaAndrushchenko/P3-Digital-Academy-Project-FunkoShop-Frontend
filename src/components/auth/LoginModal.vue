<script setup>
import { ref, computed } from 'vue'
/* import { useRoute, useRouter } from 'vue-router' */
import { useAuthStore } from '@/stores/auth.js'
import '@material-tailwind/html/scripts/popover.js';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'

const store = useAuthStore()
const router = useRouter();

const username = ref('')
const password = ref('')
const textAlert = ref('')

const { t } = useI18n()

const placeholderText = computed(() => t('Password'));

async function login() {
  if (username.value != '' && password.value != '')
    try {
      const response = await store.login(username.value, password.value)

      if (response.id) {
        store.user.id = response['id']
        store.user.email = username.value
        store.user.role = response['role']
        store.user.isAuthenticated = true
        store.user.access_token = response['access_token']
        store.user.refresh_token = response['refresh_token']

        localStorage.setItem('id', response['id'])
        localStorage.setItem('email', username.value)
        localStorage.setItem('role', response['role'])
        localStorage.setItem('isAuthenticated', "true")
        localStorage.setItem('access_token', response['access_token'])
        localStorage.setItem('refresh_token', response['refresh_token'])

        username.value = '';
        password.value = '';
        textAlert.value = '';

        if (response['role'] == "ADMIN") {
          router.push('/admin/products');
        }
      }
      else
        textAlert.value = t("alert1");
    } catch (error) {
      textAlert.value = t("alert2");
    }
  else
    textAlert.value =  t("alert3") ;
}
</script>

<template>
  <div class="flex">
    <div
      class="relative flex h-auto max-w-md flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white border-2 rounded-xl border-gray-300/30 shadow-md">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-15 w-auto" src="@/assets/img/logos/BlueLogo.svg" alt="Your Company" />
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <div class="mt-2">
              <input v-model="username" id="email" name="email" type="email" autocomplete="email" placeholder="Email"
                class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-blueFunko-500 focus:ring-blueFunko-300 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
                :placeholder="placeholderText"
                class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-blueFunko-500 focus:ring-blueFunko-300 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit"
              class="flex w-full justify-center rounded-md bg-blueFunko-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blueFunko-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueFunko-800 easy-in-out duration-150 hover:scale-105 hover:delay-150">
              {{ t('Sign in') }}
            </button>
          </div>

          <div v-if="textAlert != ''"
            class="mt-4 font-regular relative block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100"
            data-dismissible="alert">
            <div class="mr-12">{{ textAlert }}</div>
          </div>
        </form>
        <!-- <p class="text-sm text-center mt-10 text-gray-400">——— Connect With ———</p>

        <div class="flex justify-center w-full items-center">
          <button class="border-2 border-black/30 rounded-lg mt-6 py-2 px-12 hover:bg-gray-50">
            <img src="../assets/img/logos/GoogleLogo.svg" alt="" />
          </button>
        </div> -->
      </div>
      <img src="../assets/img/details/PointShape.svg" alt="" class="w-10 absolute bottom-1 left-1" />
      <img src="../assets/img/details/PointShape.svg" alt="" class="w-10 absolute top-1 right-1" />
    </div>
  </div>
</template>

<style></style>
