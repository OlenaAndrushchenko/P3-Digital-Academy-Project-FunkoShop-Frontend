export default class Favorite {
  #favoriteId
  #productId
  #userId
  #accessToken

  constructor(favoriteId, productId, userId, accessToken) {
    this.#favoriteId = favoriteId
    this.#productId = productId
    this.#userId = userId
    this.#accessToken = accessToken
  }

  getFavoriteId() {
    return this.#favoriteId
  }

  getProductId() {
    return this.#productId
  }

  getUserId() {
    return this.#userId
  }

  getAccessToken() {
    return this.#accessToken
  }
}
