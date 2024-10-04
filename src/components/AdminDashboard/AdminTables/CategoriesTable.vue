<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/AdminDashboard/AdminTables/BaseTable.vue'
import { CategoryStore } from '@/stores/category/CategoryStore'
import CategoryTableRow from './CategoryTableRow.vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const open = ref(false)

const listCategoryStore = CategoryStore();
const listCategories = ref([]);

async function getCategories() {
  try {
    const response = await listCategoryStore.getCategories();
    listCategories.value = [...response];
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

function alert() {
  open.value = !open.value
}

onMounted(() => {
  getCategories()
})

</script>

<template>
  <div>
    <BaseTable :headers="['Name', 'Imagen', 'Highlights']">
      <CategoryTableRow v-for="category in listCategories" :key="category.id" :category="category" :alert="alert" />
    </BaseTable>
  </div>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Error
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-dark-500">You cannot select more than 2 categories to be displayed.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-blueFunko-700 px-3 py-2 text-white hover:bg-blueFunko-800 sm:mt-0 sm:w-auto"
                  @click="open = false">Accept</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
