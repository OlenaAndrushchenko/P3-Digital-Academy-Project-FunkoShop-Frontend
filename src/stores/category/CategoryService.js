import CategoryRepository from "./CategoryRepository"

export default class CategoryService {

    #repo

    constructor() {
        this.#repo = new CategoryRepository()
    }

    async getCategories() {
        const response = await this.#repo.getCategories()
        return response
    }


    async setCategory(category, accessToken) {
        const response = await this.#repo.setCategory(category, accessToken)
        return response
    }

}