import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_ENDPOINT + '/categories';

export default class CategoryRepository {

    async getCategories() {
        try {
            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }

            let reqOptions = {
                url: BASE_URL,
                method: "GET",
                headers: headersList
            }

            const response = await axios.request(reqOptions);

            const data = await response.data

            return data;

        } catch (error) {
            return error.toJSON()
        }
    }

    async setCategory(category, accessToken) {
        try {
            let headersList = {
                "Accept": "*/*",
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json"
            }

            let bodyContent = {
                id: category.id,
                name: category.name,
                imageHash: category.imageHash,
                highlights: category.highlights,
            }

            let reqOptions = {
                url: BASE_URL,
                method: "PUT",
                headers: headersList,
                data: bodyContent,
            }

            const response = await axios.request(reqOptions);

            return response.data;

        } catch (error) {
            console.error("Error in setCategory:", error)
            return {
                message: "Error while updating category",
                details: error.response ? error.response.data : error.toJSON()
            }
        }
    }
}
