import Model from '../models/product.js'

export default {
  count: async () => {
    try {
      return await Model.count()
    } catch (error) {
      throw error
    }
  },

  find: async (page, limit) => {
    try {
      resizeBy.send(page, limit)
    } catch (error) {}
  },

  findById: async () => {
    try {
    } catch (error) {}
  },

  create: async () => {
    try {
    } catch (error) {}
  },

  update: async () => {
    try {
    } catch (error) {}
  },

  delete: async () => {
    try {
    } catch (error) {}
  },
}
