<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/20/solid'
import BadgeCard from '../Cards/BadgeCard.vue'
import FavoriteIcon from '../Cards/FavoriteIcon.vue';

import { useCartStore } from '../../stores/cart/cartStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['close'])

const quantity = ref(1)

const cartStore = useCartStore()

const discountedPrice = computed(() => {
  if (props.product.discount && props.product.discount > 0) {
    const discountAmount = props.product.price * (props.product.discount / 100)
    return (props.product.price - discountAmount).toFixed(2)
  }
  return props.product.price.toFixed(2)
})

const maxStockReached = computed(() => {
  return quantity.value >= props.product.stock
})

const incrementQuantity = () => {
  if (quantity.value < props.product.stock) {
    quantity.value++
  }
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (quantity.value <= props.product.stock) {
    const productToAdd = {
      id: props.product.id,
      name: props.product.name,
      price: discountedPrice.value,
      imageHash: props.product.imageHash 
    }; 
    cartStore.addProduct(productToAdd, quantity.value);
    emit('close');
  } else {
    console.error('Quantity exceeds stock');
  }
};

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
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-10" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"
        ></div>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <DialogPanel
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
            >
              <div
                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
              >
                <button
                  type="button"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="emit('close')"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div
                  class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
                >
                  <div
                    class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"
                  >
                    <img
                      :src="productImageUrl"
                      alt="product image"
                      class="object-cover object-center"
                    />
                  </div>
                  <div class="sm:col-span-8 lg:col-span-7">
                    <div class="w-auto flex place-items-center justify-between pr-10">
                      <div>
                        <BadgeCard :id="product.name" :stock="product.stock"
                          :isDiscount="product.discount > 0 ? true : false"
                          :discount="product.discount > 0 ? product.discount : 0" :isNew="product.new" />
                      </div>
                        <FavoriteIcon :productId="product.id"/>
                    </div>
                    <p class="text-sm text-gray-900 mt-2">
                      {{ props.product.category?.name || t('category') }}
                    </p>
                    <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">
                      {{ props.product.name || t('productName') }}
                    </h2>

                    <section aria-labelledby="information-heading">
                      <div class="py-4">
                        <h4 class="sr-only">Reviews</h4>
                        <div class="flex items-center">
                          <div class="flex items-center">
                            <StarIcon v-for="rating in 5" :key="rating" :class="{
                              'text-gray-900': (props.product.rating || 0) >= rating,
                              'text-gray-200': (props.product.rating || 0) < rating,
                              'h-5 w-5 flex-shrink-0': true
                            }" aria-hidden="true" />
                          </div>
                          <p class="sr-only">{{ props.product.rating || 0 }} out of 5 stars</p>
                          <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {{ props.product.reviewCount || 0 }} reviews
                          </a>
                        </div>
                      </div>
                      <p
                        v-if="props.product.discount > 0"
                        class="line-through text-gray-500 text-sm"
                      >
                        {{ props.product.price.toFixed(2) }}€
                      </p>
                      <h3 class="text-2xl font-semibold" :class="props.product.discount > 0 ? 'text-red-600' : 'text-gray-900'">
                        {{ discountedPrice }}€
                      </h3>
                      <div class="py-4">
                        <h4 class="text-lg text-gray-900 font-semibold">{{ t('description') }}</h4>
                        <p class="text-sm text-gray-900">
                          {{ props.product.description || 'Description not available.' }}
                        </p>
                      </div>
                    </section>
                    <section aria-labelledby="options-heading">
                      <h3 id="options-heading" class="sr-only">Product Options</h3>
                      <div class="mt-4">
                        <label for="quantity" class="block text-sm font-semibold text-gray-900"
                          >Qty.</label
                        >
                        <div class="flex mt-1">
                          <button
                            @click="decrementQuantity"
                            class="px-2 py-1 border rounded-l-md bg-gray-200 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <input type="number" id="quantity" class="border-t border-b border-gray-300 w-16 text-center"
                            v-model="quantity" :max="props.product.stock" :min="1" />
                          <button @click="incrementQuantity" :disabled="maxStockReached"
                            class="px-2 py-1 border rounded-r-md bg-gray-200 hover:bg-gray-300">
                            +
                          </button>
                        </div>
                        <p v-if="maxStockReached" class="text-red-500 text-sm mt-1">
                          {{ t('maxStockReached', { stock: props.product.stock }) }}
                        </p>
                      </div>
                      <div class="mt-6">
                        <button
                          type="button"
                          @click="addToCart"
                          class="w-full rounded-md border border-transparent bg-blueFunko-700 px-4 py-2 text-base font-medium text-white transition-all hover:bg-blueFunko-600 focus:outline-none"
                        >
                          {{ t('addToCart') }}
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
