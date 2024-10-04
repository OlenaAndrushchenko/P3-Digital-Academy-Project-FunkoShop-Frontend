<script setup>
import HighlightsButton from './Buttons/HighlightsButton.vue';

defineProps({
  category: {
    type: Object,
    required: true
  },
  alert: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <tr class="bg-slate-50 hover:bg-gray-100 text-slate-900 border-t border-slate-300">
    <td class="px-4 py-3 font-semibold">{{ category.name }}</td>
    <td class="px-4 py-3"><img v-if="category.imageHash" :src="category.imageHash" class="w-20 h-8" /></td>
    <td class="px-4 py-3">
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <HighlightsButton :category="category" :alert="alert" />
        </div>
      </div>
    </td>
  </tr>
</template>
