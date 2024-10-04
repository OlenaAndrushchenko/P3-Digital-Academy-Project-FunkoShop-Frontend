import FavoriteRepository from './FavoriteRepository'

export default class FavoriteService {
  #repo

  constructor() {
    this.#repo = new FavoriteRepository()
  }

  async addFavorite(productId, accessToken) {
    const response = await this.#repo.addFavorite(productId, accessToken)
    return response
  }

  async getFavorites(accessToken, params) {
    const response = await this.#repo.getFavorites(accessToken, params)
    return response
  }

  async removeFavorite(productId, accessToken) {
    const response = await this.#repo.removeFavorite(productId, accessToken)
    return response
  }
}
