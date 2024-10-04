import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/products';

export const useProductStore = defineStore('products', () => {
  const products = ref([]);
  const productsNew = ref([]);
  const discountedProducts = ref([]);
  const product = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const currentPage = ref(0);
  const pageSize = ref(8);
  const totalPages = ref(0);
  const selectedCategory = ref({ id: null, name: 'All' });
  const currentDate = new Date();

  const totalProducts = computed(() => products.value.length);
  const accessToken = computed(() => localStorage.getItem('access_token'));

  const getAuthHeaders = () => {
    if (!accessToken.value) {
      throw new Error('Unauthorized: No access token found');
    }
    return {
      Authorization: `Bearer ${accessToken.value}`,
    };
  }

  const fetchProducts = async (url, params = {}) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(url, { params });
      products.value = response.data.content ? response.data.content.map(product => {
        const createdAt = new Date(product.createdAt);
        const isNew = (currentDate - createdAt) <= (30 * 24 * 60 * 60 * 1000);
        return {
          ...product,
          isNew,
          imageHash: product.imageHash
        };
      }) : response.data;
      currentPage.value = response.data.number || 0;
      pageSize.value = response.data.size || 8;
      totalPages.value = response.data.totalPages || 1;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchAllProducts = async (page = 0, size = 8, sortBy = 'createdAt', sortOrder = 'desc') => {
    let url = BASE_URL;
    const params = { page, size, sort: `${sortBy},${sortOrder}` };

    if (selectedCategory.value.id !== null) {
      url = `${BASE_URL}/category/${selectedCategory.value.id}`;
    }

    await fetchProducts(url, params);
  };

  const setCategory = async (category) => {
    selectedCategory.value = category;
    currentPage.value = 0;
    await fetchAllProducts(0, pageSize.value);
  };

  const fetchProductById = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      product.value = response.data;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const searchProductsByKeyword = async (keyword, page = 0, size = 8, sortBy = 'name', sortOrder = 'asc') => {
    const url = `${BASE_URL}/keyword/${keyword}`;
    const params = { page, size, sort: `${sortBy},${sortOrder}` };
    await fetchProducts(url, params);
  };

  const fetchDiscountedProducts = async () => {
    const url = `${BASE_URL}/discounted`;
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(url);
      discountedProducts.value = response.data.map(product => ({
        ...product,
        isDiscount: product.discount > 0
      }));
      products.value = discountedProducts.value;
      currentPage.value = 0;
      totalPages.value = 1;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchNewProducts = async () => {
    const url = `${BASE_URL}/new`;
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.get(url);
      productsNew.value = response.data.map(product => {
        const createdAt = new Date(product.createdAt);
        const isNew = (currentDate - createdAt) <= (30 * 24 * 60 * 60 * 1000);
        return {
          ...product,
          isNew
        };
      });
      currentPage.value = 0;
      totalPages.value = 1;
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const addProduct = async (productData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.post(BASE_URL, productData, {
        headers: getAuthHeaders(),
      });
  
      products.value.push(response.data);
    } catch (err) {
        handleError(err);
        throw err;
    } finally {
        isLoading.value = false;
    }
  };

  const updateProduct = async (id, productData) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, productData, {
        headers: getAuthHeaders(),
      });
      product.value = response.data;
      const index = products.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.value[index] = {
          ...response.data,
          isDiscount: response.data.discount > 0
        };
      }
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProduct = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: getAuthHeaders(),
      });
      products.value = products.value.filter((product) => product.id !== id);
    } catch (err) {
      handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  const handleError = (err) => {
    error.value = err.response
      ? `Server Error: ${err.response.status} - ${err.response.data.message || err.response.statusText}`
      : err.request
        ? 'No response from server. Please check your network or server status.'
        : `Error: ${err.message}`;
  };

  return {
    products,
    product,
    productsNew,
    discountedProducts,
    isLoading,
    error,
    currentPage,
    pageSize,
    totalPages,
    selectedCategory,
    totalProducts,
    fetchAllProducts,
    setCategory,
    fetchProductById,
    searchProductsByKeyword,
    fetchDiscountedProducts,
    fetchNewProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
});
