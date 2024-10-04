<script setup>
import { computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useI18n } from 'vue-i18n'
import GBFlag from '@/assets/img/Flags/GB.svg'
import ESFlag from '@/assets/img/Flags/ES.svg'

const { locale } = useI18n()

const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}

const languages = [
  { code: 'es', flag: ESFlag, label: 'Spanish' },
  { code: 'en', flag: GBFlag, label: 'English' }
]

const filteredLanguages = computed(() => {
  return languages.filter((lang) => lang.code !== locale.value)
})
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-transparent border-2 border-white px-2 py-1 text-sm font-semibold text-gray-900"
      >
        <img
          :src="locale === 'en' ? GBFlag : ESFlag"
          alt="current language flag"
          class="block h-auto w-5 flex-shrink-0"
        />
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-15 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <MenuItem v-for="lang in filteredLanguages" :key="lang.code" v-slot="{ active }">
            <a
              @click.prevent="changeLanguage(lang.code)"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-1 text-sm'
              ]"
            >
              <img :src="lang.flag" :alt="lang.label + ' flag'" />
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
