<script setup>
import BaseButton from '@/components/BaseComponents/BaseButton.vue';

  defineEmits(['confirm', 'cancel']);
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 md:p-10 rounded-lg shadow-lg flex flex-col gap-5">
        <h3 class="text-2xl font-semibold text-slate-950">Confirm Delete</h3>
        <p class="text-base text-slate-900">Are you sure you want to delete this product?</p>
        <div class="mt-4 flex justify-end space-x-2">
          <BaseButton @click="$emit('cancel')" variant="secondary">Cancel</BaseButton>
          <BaseButton @click="$emit('confirm')" variant="primary" class="bg-red-600 hover:bg-red-700">Delete</BaseButton>
        </div>
      </div>
    </div>
</template>