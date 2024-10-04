<script setup>
import { ref } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { CategoryStore } from '@/stores/category/categoryStore'
import ProductForm from '../ProductForm.vue'

const props = defineProps({
  show: Boolean,
  productData: Object,
  onUpdate: Function
})

defineEmits(['close'])

const productStore = useProductStore()
const listCategoryStore = CategoryStore()
const listCategories = ref([])

const { isLoading: isLoadingCategories, error: categoryError } = storeToRefs(listCategoryStore)

const getCategories = async () => {
  const response = await listCategoryStore.getCategories()
  listCategories.value = response
}

getCategories()

const handleSubmit = async (formData) => {
  try {
    await productStore.updateProduct(props.productData.id, formData)
    props.onUpdate();
  } catch (err) {
    console.error('Failed to update product:', err)
  }
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto"
  >
    <div
      class="bg-white w-full max-w-2xl mx-auto p-6 md:p-10 rounded-lg shadow-lg flex flex-col gap-5 my-8"
    >
      <div class="flex justify-between items-center pb-4 border-b border-slate-200">
        <h3 class="text-2xl font-semibold text-slate-950">Edit Product</h3>
        <button
          @click="$emit('close')"
          class="w-10 h-10 bg-slate-100 rounded-full hover:bg-blueFunko-100 text-blueFunko-600 text-2xl"
        >
          &times;
        </button>
      </div>

      <ProductForm
        :initialProductData="productData" 
        :isLoadingCategories="isLoadingCategories"
        :listCategories="listCategories"
        :categoryError="categoryError"
        @submit="handleSubmit"
        @cancel="$emit('close')"
      />
    </div>
  </div>
</template>
