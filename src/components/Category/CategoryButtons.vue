<script setup>
import { defineProps } from 'vue';

defineProps({
  categories: Array,
  selectedCategory: Object,
});
</script>

<template>
  <div class="flex flex-wrap justify-center my-4">
    <button
      v-for="category in categories"
      :key="category.id"
      @click="$emit('change-category', category)"
      :class="[
        'px-4 py-2 m-2 rounded',
        category.id === selectedCategory.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700',
      ]"
    >
      {{ category.name }}
    </button>
  </div>
</template>