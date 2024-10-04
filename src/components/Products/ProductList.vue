<script setup>
import FunkoCard from './../Cards/FunkoCard.vue'

defineProps({
  products: {
    type: Array,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['changePage'])

const goToPage = (page) => {
  emits('changePage', page)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:pt-4 lg:max-w-7xl lg:px-8">
    <div v-if="totalPages > 1" class=" sm:hidden flex justify-center items-center space-x-1.5 pt-4 pb-4">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0"
        class="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blueFunko-900 hover:border-blueFunko-900 focus:text-white focus:bg-blueFunko-900 focus:border-blueFunko-900 active:border-blueFunko-900 active:text-white active:bg-blueFunko-900 disabled:pointer-events-none disabled:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>

      <button v-for="page in totalPages" :key="page" @click="goToPage(page - 1)" :disabled="page - 1 === currentPage"
        class="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blueFunko-900 hover:border-blueFunko-900 focus:text-white focus:bg-blueFunko-900 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:bg-blueFunko-900 disabled:text-white">
        {{ page }}
      </button>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage + 1 >= totalPages"
        class="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blueFunko-900 hover:border-bg-blueFunko-900 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-blueFunko-600 disabled:pointer-events-none disabled:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>

    <div
      class="grid justify-items-center grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      <FunkoCard v-for="product in products" :key="product.productId" :product="product" class="mx-auto" />
    </div>

    <div v-if="totalPages > 1" class="flex justify-center items-center space-x-1.5 pt-10 pb-10">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0"
        class="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blueFunko-900 hover:border-blueFunko-900 focus:text-white focus:bg-blueFunko-900 focus:border-blueFunko-900 active:border-blueFunko-900 active:text-white active:bg-blueFunko-900 disabled:pointer-events-none disabled:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </button>

      <button v-for="page in totalPages" :key="page" @click="goToPage(page - 1)" :disabled="page - 1 === currentPage"
        class="min-w-9 rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blueFunko-900 hover:border-blueFunko-900 focus:text-white focus:bg-blueFunko-900 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:bg-blueFunko-900 disabled:text-white">
        {{ page }}
      </button>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage + 1 >= totalPages"
        class="rounded-md border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-blueFunko-900 hover:border-bg-blueFunko-900 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-blueFunko-600 disabled:pointer-events-none disabled:opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </div>
  </div>
</template>
