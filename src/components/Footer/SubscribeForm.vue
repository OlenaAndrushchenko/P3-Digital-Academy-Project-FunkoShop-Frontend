<script setup>
import { NewLettersStore } from '@/stores/newLetters/NewLettersStore';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { t } = useI18n();
const TIME_DISMISSED = import.meta.env.VITE_TIME_DISMISSED

const placeholderText = computed(() => t('newsletter.enterEmail'));
const email = ref('');
const newLettersStore = NewLettersStore()
const textAlert = ref("")

async function setNewLetters() {
  if (email.value != '') {
    const response = await newLettersStore.setNewLetters(email.value);

    if (response.email == email.value)
      textAlert.value = 'Suscrito satisfactoriamente';
    else
      textAlert.value = 'Hubo un error en la suscripción o existe el email en la base de datos.';
  }
  else
    textAlert.value = 'El email no puede estar vacío.'
  setTimeout(() => {
    textAlert.value = '';
  }, TIME_DISMISSED);
}

</script>


<template>
  <div class="md:col-span-7 max-w-[640px] flex flex-col gap-5 md:gap-8">
    <div class="flex flex-col gap-2">
      <h2 class="text-blueFunko-50 text-2xl md:text-4xl font-semibold uppercase">
        {{ t('newsletter.subscribeHeading') }} </h2>
      <div class="text-blueFunko-50/90 text-lg md:text-xl font-open-sans">
        {{ t('newsletter.subscribeDescription') }}
      </div>
    </div>

    <div v-if="textAlert != ''" :class="textAlert == 'Suscrito satisfactoriamente' ? 'bg-green-500' : 'bg-red-500'"
      class="font-regular relative block w-full rounded-lg p-4 text-base leading-5 text-white opacity-100"
      data-dismissible="alert">
      <div class="mr-12">{{ textAlert }}</div>
    </div>

    <form class="flex flex-wrap lg:gap-0 gap-4" @submit.prevent="setNewLetters">
      <input type="email" :placeholder="placeholderText" v-model="email" required
        class="w-full lg:max-w-[395px] px-6 py-4 rounded-full lg:rounded-r-[30px] focus:outline-none focus:bg-blueFunko-50 placeholder:text-slate-400 text-slate-950" />
      <button type="submit"
        class="px-6 py-4 bg-blueFunko-200 hover:bg-blueFunko-300 text-slate-900 font-semibold rounded-full lg:rounded-l-[30px]">
        {{ t('newsletter.subscribe') }}
      </button>
    </form>
  </div>
</template>
