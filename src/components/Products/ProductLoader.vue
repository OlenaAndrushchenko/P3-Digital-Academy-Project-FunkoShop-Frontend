<script setup>
import { defineProps } from 'vue';
import ProductList from './ProductList.vue';

defineProps({
  products: Array,
  currentPage: Number,
  totalPages: Number,
  isLoading: Boolean,
  error: String,
});
</script>

<template>
    <div>
      <div v-if="isLoading" class="text-center mt-2">
        <p>Loading products...</p>
      </div>
      <div v-else-if="error" class="text-center mt-2 text-red-500">
        <p>Error: {{ error }}</p>
      </div>
      <div v-else>
        <ProductList
          :products="products"
          :currentPage="currentPage"
          :totalPages="totalPages"
          @changePage="$emit('change-page', $event)"
        />
      </div>
    </div>
  </template>
