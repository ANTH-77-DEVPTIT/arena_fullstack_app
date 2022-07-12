import ResponseHandler from '../helpers/responseHandler.js'

import Service from '../services/product.js'

export default {
  find: async (req, res) => {
    try {
      const data = await Service.find(req)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const data = await Service.findById(req)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  create: async (req, res) => {
    try {
      const data = await Service.create(req)
      console.log(data);
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res) => {
    try {
      const data = await Service.update(req)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      const data = await Service.delete(req)
      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
