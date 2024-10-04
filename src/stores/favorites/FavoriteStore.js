import { defineStore } from 'pinia'
import { ref } from 'vue'
import FavoriteService from './FavoriteService'

export const FavoriteStore = defineStore('favorites', () => {

  const currentPage = ref(0);
  const pageSize = ref(8);
  const totalPages = ref(0);

  function addFavorite(productId, accessToken) {
    const service = new FavoriteService()
    return service.addFavorite(productId, accessToken)
  }

  function getFavorites(accessToken, page = 0, size = 8) {
    const params = { page, size };
    const service = new FavoriteService()
    return service.getFavorites(accessToken, params)
  }

  function removeFavorite(productId, accessToken) {
    const service = new FavoriteService()
    return service.removeFavorite(productId, accessToken)
  }

  return { currentPage, pageSize, totalPages, addFavorite, getFavorites, removeFavorite }
})
