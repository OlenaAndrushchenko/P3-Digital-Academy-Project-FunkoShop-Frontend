<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import { useCategoryStore } from '../stores/category/CategoryStore'
import { storeToRefs } from 'pinia'
import ProductList from './../components/Products/ProductList.vue'
import SearchComponent from './../components/NavBar/SearchButton.vue'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const {
  products,
  isLoading: productLoading,
  error: productError,
  currentPage,
  totalPages,
  selectedCategory
} = storeToRefs(productStore)

const { categories, isLoading: categoryLoading, error: categoryError } = storeToRefs(categoryStore)

onMounted(() => {
  categoryStore.fetchCategories()
  productStore.fetchAllProducts()
})

const handlePageChange = (newPage) => {
  productStore.fetchAllProducts(newPage)
}

const handleCategoryChange = (category) => {
  productStore.setCategory(category)
}
</script>

<template>
  <div class="min-h-screen">
    <SearchComponent @onSearch="handleSearch" />

    <div v-if="!categoryLoading && !categoryError" class="flex flex-wrap justify-center my-4">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="handleCategoryChange(category)"
        :class="[
          'px-4 py-2 m-2 rounded',
          category.id === selectedCategory.id
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700'
        ]"
      >
        {{ category.name }}
      </button>
    </div>
    <div v-else-if="categoryLoading" class="text-center mt-2">
      <p>Loading categories...</p>
    </div>
    <div v-else-if="categoryError" class="text-center mt-2 text-red-500">
      <p>Error: {{ categoryError }}</p>
    </div>

    <div v-if="productLoading" class="text-center mt-2">
      <p>Loading products...</p>
    </div>
    <div v-else-if="productError" class="text-center mt-2 text-red-500">
      <p>Error: {{ productError }}</p>
    </div>
    <div v-else>
      <ProductList
        :products="products"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @changePage="handlePageChange"
      />
    </div>
  </div>
</template>
