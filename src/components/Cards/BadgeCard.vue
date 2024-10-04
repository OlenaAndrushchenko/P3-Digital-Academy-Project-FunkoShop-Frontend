<script setup>
const props = defineProps({
  isNew: Boolean,
  isDiscount: Boolean,
  discount: Number,
  stock: {
    type: Number,
    default: 0, 
  }
})
</script>

<template>
  <div
    class="rounded-xl px-2.5 border border-transparent text-md flex items-center text-white transition-all shadow-sm"
    :class=" 
      stock > 0
        ? props.isDiscount
          ? 'bg-red-500'
          : props.isNew
            ? 'bg-blueFunko-700'
            : 'bg-white'
        : 'bg-slate-800'
    "
  >
    <div v-if="!(stock > 0 && !props.isDiscount && !props.isNew)">
      <p v-if="stock === 0">Sold</p>
      <p v-if="stock > 0 && props.isDiscount">{{ discount }}% off</p>
      <p v-if="stock > 0 && !props.isDiscount && props.isNew">New</p>
    </div>
  </div>
</template>

