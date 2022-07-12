import Repository from "../repositories/vendor.js";

export default {
    find: async () => {
        try {

            return await Repository.find()
        } catch (error) {
            throw error
        }
    },

    create: async (req) => {
        try {
            const data = { ...req.body }
            return await Repository.create(data)
        } catch (error) {
            throw error
        }
    }
}