<script setup>
import { useAuthStore } from '@/stores/auth';
import { CategoryStore } from '@/stores/category/CategoryStore';
import { ref } from 'vue';

const TIME_DISMISSED = import.meta.env.VITE_TIME_DISMISSED
const auth = useAuthStore()
const store = CategoryStore();
const props = defineProps({
    category: {
        type: Object,
        required: true
    },
    alert: {
        type: Function,
        required: true
    }
})
const newCategory = ref(props.category);

async function setCategory() {
    try {
        newCategory.value.highlights = !newCategory.value.highlights;
        const response = await store.setCategory(newCategory.value, auth.user.access_token);

        if (response.message) {
            newCategory.value.highlights = !newCategory.value.highlights;
            props.alert();
        }
    } catch (error) {
        console.error('Error setting category:', error);
    }

    setTimeout(() => {
    }, TIME_DISMISSED);
}
</script>

<template>
    <button @click="setCategory()"
        :class="newCategory.highlights ? 'bg-blueFunko-100 hover:bg-slate-300' : 'bg-slate-300 hover:bg-blueFunko-100'"
        class="flex gap-4 px-5 py-2.5 text-base font-medium text-slate-950 uppercase transition-all duration-300">
        {{ !newCategory.highlights ? 'No Selected' : 'Selected' }}
    </button>
</template>

<style scoped></style>