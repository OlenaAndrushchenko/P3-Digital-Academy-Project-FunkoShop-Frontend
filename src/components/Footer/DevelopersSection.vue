<script setup>
import { useI18n } from 'vue-i18n';
import Icon from './DeveloperIcon.vue'

const { t } = useI18n();

const developers = [
  {
    name: 'Aitor',
    icon: new URL('@/assets/img/DevelopersIcons/aitor.jpeg', import.meta.url).href,
    link: 'https://github.com/aitorgarciadev'
  },
  {
    name: 'Bego',
    icon: new URL('@/assets/img/DevelopersIcons/bego.jpeg', import.meta.url).href,
    link: 'https://github.com/begoblanco'
  },
  {
    name: 'Diego',
    icon: new URL('@/assets/img/DevelopersIcons/diego.jpeg', import.meta.url).href,
    link: 'https://github.com/diegofdez56'
  },
  {
    name: 'Javier',
    icon: new URL('@/assets/img/DevelopersIcons/javier.jpeg', import.meta.url).href,
    link: 'https://github.com/devjmv'
  },
  {
    name: 'Olena',
    icon: new URL('@/assets/img/DevelopersIcons/olena.jpeg', import.meta.url).href,
    link: 'https://github.com/OlenaAndrushchenko'
  },
  {
    name: 'Vero',
    icon: new URL('@/assets/img/DevelopersIcons/vero.jpeg', import.meta.url).href,
    link: 'https://github.com/Miharu669'
  }
]
</script>

<template>
  <div class="md:col-span-5 flex flex-col justify-center gap-5">
    <div class="mb-2">
        <img class="h-[104px] w-auto" src="@/assets/img/logos/WhiteLogo.svg" alt="Funko logo" />
    </div>

    <h3 class="text-blueFunko-50 text-base font-semibold">{{ t('developers.developedBy') }}</h3>
    <div class="flex flex-wrap gap-4">
      <Icon
        v-for="(dev, index) in developers"
        :key="index"
        :icon="dev.icon"
        :link="dev.link"
        :alt="dev.name"
      />
    </div>
  </div>
</template>
