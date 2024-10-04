<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '../stores/productStore';
import { storeToRefs } from 'pinia';
import { CategoryStore } from '@/stores/category/categoryStore';
import ProductLoader from '@/components/Products/ProductLoader.vue';
import CategoryButtons from '@/components/Category/CategoryButtons.vue';

const productStore = useProductStore();
const listCategoryStore = CategoryStore();
const listCategories = ref([]);

const {
  products,
  isLoading: productLoading,
  error: productError,
  currentPage,
  totalPages,
  selectedCategory,
} = storeToRefs(productStore);

const {
  isLoading: categoryLoading,
  error: categoryError,
} = storeToRefs(CategoryStore);

async function getCategories() {
  const response = await listCategoryStore.getCategories();
  listCategories.value = [{ id: null, name: 'All' }, ...response];
}

onMounted(() => {
  productStore.fetchAllProducts();
  getCategories();
});

const handlePageChange = (newPage) => {
  productStore.fetchAllProducts(newPage);
};



const handleCategoryChange = (category) => {
  productStore.setCategory(category);
};
</script>

<template>
  <div class="min-h-screen">
    <CategoryButtons :categories="listCategories" :selectedCategory="selectedCategory"
      @change-category="handleCategoryChange" />

    <div v-if="categoryLoading" class="text-center mt-2">
      <p>Loading categories...</p>
    </div>
    <div v-else-if="categoryError" class="text-center mt-2 text-red-500">
      <p>Error: {{ categoryError }}</p>
    </div>

    <ProductLoader :products="products" :currentPage="currentPage" :totalPages="totalPages" :isLoading="productLoading"
      :error="productError" @change-page="handlePageChange" />
  </div>
</template>