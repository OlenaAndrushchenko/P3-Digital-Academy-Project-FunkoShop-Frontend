<script setup>
import { CategoryStore } from '@/stores/category/CategoryStore';
import { ref, onMounted, onUnmounted } from 'vue';

const store = CategoryStore();
const categories = ref([]);

const activeIndex = ref(0);
const intervalTime = 4000;


async function getCategories() {
    const response = await store.getCategories();
    categories.value = response.filter(item => item.highlights);
}

onMounted(() => {
    getCategories();
});

// Función para actualizar el índice activo
const setActiveIndex = (index) => {
    activeIndex.value = index;
};

// Función para cambiar al siguiente slide
const nextSlide = () => {
    activeIndex.value = (activeIndex.value + 1) % 2;
};

// Manejadores del ciclo de vida
let interval;
onMounted(() => {
    interval = setInterval(() => {
        nextSlide();
    }, intervalTime);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>



<template>
    <div class="carousel-container relative overflow-hidden">
        <div class="carousel-wrapper" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
            <img v-for="(item, index) in categories" :key="index" :src="item.imageHash" :alt="`image ${index + 1}`"
                class="carousel-image" />
        </div>

        <div class="absolute bottom-4 left-2/4 z-0 flex -translate-x-2/4 gap-2">
            <span v-for="(item, index) in categories" :key="index"
                class="block h-1 cursor-pointer rounded-2xl transition-all"
                :class="activeIndex === index ? 'w-8 bg-white' : 'w-4 bg-white/50'"
                @click="setActiveIndex(index)"></span>
        </div>
    </div>
</template>

<style scoped>
.carousel-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    margin: auto;
}

.carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
}

.carousel-image {
    min-width: 100%;
    height: 500px;
    object-fit: cover;
}
</style>