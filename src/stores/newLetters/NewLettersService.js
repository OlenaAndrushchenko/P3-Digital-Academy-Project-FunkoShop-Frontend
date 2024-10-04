import NewLettersRepository from "./NewLettersRepository"

export default class NewLettersService {

    #repo

    constructor() {
        this.#repo = new NewLettersRepository()
    }

    async setNewLetters(email) {
        const response = await this.#repo.setNewLetters(email)
        return response
    }

}