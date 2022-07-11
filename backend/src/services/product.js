import CloudinaryUploader from '../connector/cloudinary/index.js'
import Repository from '../repositories/product.js'

export default {
  count: async (req) => {
    try {
      return await Repository.count()
    } catch (error) {
      console.log(error)
      throw error
    }
  },

  find: async (req) => {
    try {
      const { page, limit } = req.query

      let _page = parseInt(page) >= 1 ? parseInt(page) : 1
      let _limit = parseInt(limit) >= 0 ? parseInt(limit) : 20

      return await Repository.find({ page: _page, limit: _limit })
    } catch (error) {
      throw error
    }
  },

  findById: async () => {
    try {
    } catch (error) {
      throw error
    }
  },

  create: async () => {
    try {
    } catch (error) {
      throw error
    }
  },

  update: async () => {
    try {
    } catch (error) {
      throw error
    }
  },

  delete: async () => {
    try {
    } catch (error) {
      throw error
    }
  },
}
