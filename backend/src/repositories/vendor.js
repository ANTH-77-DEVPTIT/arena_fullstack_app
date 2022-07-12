import Model from "../models/vendor.js"

export default {
    find: async () => {
        try {
            return await Model.findAll()
        } catch (error) {
            throw error
        }
    },

    create: async (data) => {
        try {
            console.log(data);
            return Model.create(data)
        } catch (error) {
            throw error
        }
    }
}