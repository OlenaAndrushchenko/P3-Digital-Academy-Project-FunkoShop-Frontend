import { defineStore } from "pinia";
import { ref } from "vue";
import CategoryService from "./CategoryService";


export const CategoryStore = defineStore('categories', () => {

    const categories = ref()
    const isLoading = ref(false);
    const error = ref(null);

    function getCategories() {
        isLoading.value = true;
        error.value = null;
        try {
            const service = new CategoryService()
            return service.getCategories()
        } catch (err) {
            error.value = err.response?.data?.message || err.message;
        } finally {
            isLoading.value = false;
        }
    }

    function setCategory(category, accessToken) {
        
        const service = new CategoryService()
        return service.setCategory(category, accessToken)

    }

    return { categories, isLoading, error, getCategories, setCategory };
});