<script setup>
import AdminHeading from '@/components/AdminDashboard/AdminHeading.vue';
import AddProductModal from '@/components/AdminDashboard/AdminModals/AddProductModal.vue';
import ProductTable from '@/components/AdminDashboard/AdminTables/ProductTable.vue';
import BaseButton from '@/components/BaseComponents/BaseButton.vue';
import { ref } from 'vue';

const showAddModal = ref(false)
const productTableRef = ref(null)

const refreshProductTable = () => {
    if (productTableRef.value) {
        productTableRef.value.refreshProducts()
    }
}
</script>

<template>
    <div>
        <div class="flex items-center justify-between">
            <AdminHeading title="Products Management" />
            <BaseButton @click="showAddModal = true" variant="primary" class="ml-4">
                Add Product
            </BaseButton>
        </div>
        
        <ProductTable ref="productTableRef" />
        <AddProductModal 
            v-if="showAddModal" 
            :show="showAddModal" 
            @close="showAddModal = false"
            @added="refreshProductTable"
        />
    </div>
</template>

<style scoped>
</style>