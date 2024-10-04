<script setup>
import ReviewIcon from './ReviewIcon.vue';
import FavoriteIcon from './FavoriteIcon.vue';
import BadgeCard from './BadgeCard.vue'
import ProductModal from './../ProductDetail/ProductModal.vue'
import { useProductModal } from '/src/composables/useProductModal.js'
import { computed } from 'vue'
// import { FavoriteStore } from '/src/store/favorite/favoriteStore.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { isModalOpen, openModal, closeModal } = useProductModal()


const discountedPrice = computed(() => {
  if (props.product.discount && props.product.discount > 0) {
    const discountAmount = props.product.price * (props.product.discount / 100);
    return (props.product.price - discountAmount).toFixed(2);
  }
  return props.product.price.toFixed(2);
});

const productImageUrl = computed(() => {
  if (props.product.imageHash) {
    
    const isBase64 = props.product.imageHash.startsWith('/') || props.product.imageHash.includes('base64');
    
    if (isBase64) {
      return `data:image/png;base64,${props.product.imageHash}`;
    } else {
      return props.product.imageHash; 
    }
  }
  return '';
});
</script>

<template>
  <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-64">
    <div class="flex justify-between pt-3 px-3">
      <div class="w-full flex place-items-center justify-between">
          <BadgeCard :id="product.name" :stock="product.stock" :isDiscount="product.discount > 0 ? true : false"
            :discount="product.discount > 0 ? product.discount : 0" :isNew="product.isNew" />
          <FavoriteIcon :productId="product.id"/>
      </div>
    </div>
    <div class="relative p-2 h-60 overflow-hidden rounded-xl bg-clip-border">
      <img
        :src="productImageUrl"
        alt="product image"
        class="h-full w-full object-cover rounded-md cursor-pointer"
        @click="openModal"
      />
    </div>
    <div>
      <ReviewIcon />
    </div>
    <div class="p-3">
      <p class="text-slate-600 leading-normal font-light text-xs">
        {{ product.category?.name || 'Category' }}
      </p>
      <div class="mb-2 flex items-center justify-between">
        <p class="text-slate-800 text-md font-semibold">{{ product.name }}</p>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <p v-if="product.discount && product.discount > 0" class="line-through text-gray-500 text-sm">
            {{ product.price.toFixed(2) }}€
          </p>
          <p v-if="product.discount && product.discount > 0" class="text-red-600 text-base font-semibold">
            {{ discountedPrice }}€
          </p>

          <p v-else class="text-black text-base font-semibold">{{ product.price.toFixed(2) }}€</p>
        </div>

        <button @click="openModal" class="px-2 py-2 bg-gray-200 text-white rounded hover:bg-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 text-black">
            <path fill-rule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <ProductModal :isOpen="isModalOpen" @close="closeModal" :product="product" />
  </div>
</template>
