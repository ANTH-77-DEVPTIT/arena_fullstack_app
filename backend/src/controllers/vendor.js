import ResponseHandler from '../helpers/responseHandler.js'
import Service from '../services/vendor.js'

export default {
    find: async (req, res) => {
        try {
            const data = await Service.find()
            console.log(data);
            return ResponseHandler.success(res, data)
        } catch (error) {
            return ResponseHandler.error(res, error)
        }
    },

    create: async (req, res) => {
        try {
            const data = Service.create(req)
            return ResponseHandler.success(res, data)
        } catch (error) {
            return ResponseHandler.error(res, error)
        }
    }
}