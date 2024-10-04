<script setup>
import ProductLoader from '@/components/Products/ProductLoader.vue';
import { useAuthStore } from '@/stores/auth';
import { FavoriteStore } from '@/stores/favorites/FavoriteStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const store = FavoriteStore()
const auth = useAuthStore()
const favoriteResponse = ref([])
const { currentPage, totalPages } = storeToRefs(store);

async function favorite() {
    try {
        const response = await store.getFavorites(auth.user.access_token);
        currentPage.value = response.number || 0;
        totalPages.value = response.totalPages || 1;
        favoriteResponse.value = response.content.map(favorite => favorite.product);
    } catch (error) {
        console.error("Error fetching favorites:", error);
    }
}

onMounted(() => {
    favorite();
});

const handlePageChange = async (newPage) => {
    try {
        const response = await store.getFavorites(auth.user.access_token, newPage);
        currentPage.value = response.number || 0;
        totalPages.value = response.totalPages || 1;
        favoriteResponse.value = response.content.map(favorite => favorite.product);
    } catch (error) {
        console.error("Error changing page:", error);
    }
};
</script>
<template>
    <div class="mx-auto max-w-full lg:mx-0 text-start px-24 mt-10">
        <h2 class="text-3xl font-bold tracking-tight text-dark sm:text-4xl text-center">Favorite</h2>
    </div>
    <div class="mx-auto max-w-2xl px-4 sm:px-6 sm:pt-4 lg:max-w-7xl lg:px-8">
        <ProductLoader :products="favoriteResponse" :isLoading="false" :error="null" :current-page="currentPage"
            :total-pages="totalPages" @change-page="handlePageChange" />
    </div>
</template>