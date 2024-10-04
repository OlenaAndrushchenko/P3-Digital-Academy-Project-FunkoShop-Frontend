<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart/cartStore'
import { useI18n } from 'vue-i18n'

const open = ref(false)

const cartStore = useCartStore()

const { t } = useI18n()

const cartProducts = computed(() => {
  return cartStore.products
})

const totalPrice = computed(() => {
  return cartStore.totalPrice
})

const removeFromCart = (id) => {
  if (!cartProducts.value) {
    return
  }

  const productExists = cartProducts.value.find((product) => product.id === id)
  if (productExists) {
    cartStore.removeProduct(id)
  }
}
</script>

<template>
  <button @click="open = true" class="px-1.5 py-1.5">
    <ShoppingBagIcon
      class="h-5 w-5 flex-shrink-0 text-black group-hover:text-gray-400"
      aria-hidden="true"
    />
  </button>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">{{
                        t('shoppingCart.shoppingCart')
                      }}</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="open = false"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          <li v-for="product in cartProducts" :key="product.id" class="flex py-6">
                            <div
                              class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                            >
                              <img
                                :src="product.imageHash"
                                :alt="product.name"
                                class="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div
                                  class="flex justify-between text-base font-medium text-gray-900"
                                >
                                  <h3>
                                    <a :href="product.href">{{ product.name }}</a>
                                  </h3>
                                  <p class="ml-4">{{ product.price }}€</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
                              </div>
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <p class="text-gray-500">Qty {{ product.quantity }}</p>

                                <div class="flex">
                                  <button
                                    type="button"
                                    class="font-medium text-red-500 hover:text-red-600"
                                    @click="removeFromCart(product.id)"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                          <template v-if="!cartProducts.length">
                            <li class="flex py-6 text-center w-full text-gray-500">
                              {{ t('shoppingCart.emptyCart') }}
                            </li>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{{ totalPrice }}€</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      {{ t('shoppingCart.shipping') }}
                    </p>
                    <!-- <div class="mt-6">
                      <a href="#"
                        class="flex items-center justify-center rounded-md border border-transparent bg-blueFunko-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blueFunko-800">Checkout</a>
                    </div> -->
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        {{ t('shoppingCart.or') }}{{ ' ' }}
                        <button
                          type="button"
                          class="font-medium text-blueFunko-500 hover:text-blueFunko-600"
                          @click="open = false"
                        >
                          {{ t('shoppingCart.continueShopping') }}
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
