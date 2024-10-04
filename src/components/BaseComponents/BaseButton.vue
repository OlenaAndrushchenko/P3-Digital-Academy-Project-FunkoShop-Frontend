<script setup>
import { computed } from 'vue';

const props = defineProps({
    variant: {
    type: String,
    default: 'primary',
    },
    size: {
    type: String,
    default: 'md',
    },
    disabled: {
    type: Boolean,
    default: false,
    },
});

const variantClasses = computed(() => {
    switch (props.variant) {
    case 'primary':
        return 'bg-blueFunko-700 font-medium text-white hover:bg-blueFunko-600 focus:outline-none';
    case 'secondary':
        return 'border border-blueFunko-900 text-blueFunko-900 font-medium hover:bg-blueFunko-900/15';
    default:
        return 'bg-blueFunko-700 font-medium text-white hover:bg-blueFunko-600 focus:outline-none';
    }
});

const sizeClasses = computed(() => {
    switch (props.size) {
    case 'sm':
        return 'px-3 py-1 text-sm';
    case 'md':
        return 'px-5 py-2 text-base';
    case 'lg':
        return 'px-6 py-3 text-lg';
    default:
        return 'px-5 py-2 text-base';
    }
});
</script>

<template>
    <button
      :class="[
        'base-button',
        variantClasses,
        sizeClasses,
        {
          'opacity-50 cursor-not-allowed': disabled
        }
      ]"
      :disabled="disabled"
    >
      <slot />
    </button>
</template>

<style scoped>
.base-button {
    border-radius: 0.375rem;
    transition: background-color 0.3s;
}
</style>