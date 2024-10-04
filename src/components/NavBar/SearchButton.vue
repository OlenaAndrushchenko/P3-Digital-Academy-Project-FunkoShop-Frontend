<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { SpeechRecognitionService } from '../../core/apis/SpeechRecognition'

const searchQuery = ref('')
const isListening = ref(false)
const showDropdown = ref(false)
const store = useProductStore()
const router = useRouter()
const route = useRoute()

let voiceTimeout = null

const handleVoiceInput = (transcript) => {
  searchQuery.value = transcript
  executeSearch(transcript)
  stopVoiceRecognition()
}

const stopVoiceRecognition = () => {
  if (isListening.value) {
    SpeechRecognitionService.stopRecognition()
    isListening.value = false
    clearTimeout(voiceTimeout)
  }
}

const startVoiceRecognition = () => {
  if (!isListening.value) {
    SpeechRecognitionService.startRecognition(handleVoiceInput)
    isListening.value = true

    voiceTimeout = setTimeout(() => {
      stopVoiceRecognition()
    }, 9000)
  } else {
    stopVoiceRecognition()
  }
}

const executeSearch = async (query) => {
  if (query.trim()) {
    showDropdown.value = true
    if (route.path !== '/products') {
      await router.push({ path: '/products', query: { search: query } })
    }
    try {
      await store.searchProductsByKeyword(query)
    } catch (error) {
      console.error('Error occurred during search:', error)
    }
  } else {
    showDropdown.value = false
    await store.fetchAllProducts()
  }
}

const handleProductClick = (product) => {
  router.push({ path: '/products', query: { search: product.name } })
  showDropdown.value = false
}

watch(searchQuery, (newQuery) => {
  executeSearch(newQuery)
})

onMounted(() => {
  SpeechRecognitionService.initialize()
})
</script>

<template>
  <div class="relative items-center max-w-full">
    <input
      ref="searchInput"
      type="search"
      class="no-x w-full h-8 pl-3 pr-3 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-150 ease-in-out"
      placeholder="Search"
      aria-label="Search"
      id="searchInput"
      v-model="searchQuery"
      @focus="showDropdown = true"
      @blur="hideDropdown"
      @keydown.enter.prevent="executeSearch(searchQuery)"
    />

    <button
      class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none hover:cursor-pointer focus:outline-none"
      type="button"
      @click="startVoiceRecognition"
    >
      <svg
        :class="{
          'animate-pulse': isListening,
          'fill-red-500': isListening,
          'fill-black': !isListening
        }"
        width="18"
        height="18"
        viewBox="0 0 16 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 15.125C10.2782 15.125 12.125 13.2782 12.125 11V4.125C12.125 1.8468 10.2782 0 8 0C5.7218 0 3.875 1.8468 3.875 4.125V11C3.875 13.2782 5.7218 15.125 8 15.125ZM14.875 8.25H14.1875C13.8077 8.25 13.5 8.55766 13.5 8.9375V11C13.5 14.2141 10.7289 16.793 7.45043 16.4734C4.59301 16.1945 2.5 13.6258 2.5 10.7551V8.9375C2.5 8.55766 2.19234 8.25 1.8125 8.25H1.125C0.745156 8.25 0.4375 8.55766 0.4375 8.9375V10.6631C0.4375 14.5148 3.18621 17.9485 6.96875 18.4701V19.9375H4.5625C4.18266 19.9375 3.875 20.2452 3.875 20.625V21.3125C3.875 21.6923 4.18266 22 4.5625 22H11.4375C11.8173 22 12.125 21.6923 12.125 21.3125V20.625C12.125 20.2452 11.8173 19.9375 11.4375 19.9375H9.03125V18.4864C12.7141 17.9811 15.5625 14.8199 15.5625 11V8.9375C15.5625 8.55766 15.2548 8.25 14.875 8.25Z"
        />
      </svg>
    </button>

    <ul
      v-if="showDropdown && store.suggestedProducts && store.suggestedProducts.length > 0"
      class="absolute left-0 w-full mt-2 bg-white border border-black rounded shadow-md z-50 max-h-60 overflow-y-auto"
      :style="{ width: $refs.searchInput.offsetWidth + 'px' }"
    >
      <li
        v-for="product in store.suggestedProducts"
        :key="product.id"
        class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        @mousedown.prevent="handleProductClick(product)"
      >
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.z-50 {
  z-index: 50;
}
.max-h-60 {
  max-height: 15rem;
}
.overflow-y-auto {
  overflow-y: auto;
}
.border-black {
  border-color: black;
}

input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}
</style>
