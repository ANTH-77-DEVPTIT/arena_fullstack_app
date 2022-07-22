import CloudinaryUploader from '../connector/cloudinary/index.js'
import Repository from '../repositories/product.js'

const PAGE = 1
const LIMIT = 10
const statusList = ['ACTIVE', 'DRAFT', 'ARCHIVED']
const minPrice = 1
const maxPrice = 1000000000000

export default {
  count: async () => {
    try {
      return await Repository.count()
    } catch (error) {
      throw error
    }
  },

  find: async (req) => {
    try {
      const { page, limit, status, price, vendor } = req.query

      let _page = parseInt(page) ? parseInt(page) : PAGE
      let _limit = parseInt(limit) ? parseInt(limit) : LIMIT
      let _status = status ? status : statusList
      let _priceLow = price[0] ? parseInt(price[0]) : (price[0] = minPrice)
      let _priceHigh = price[1] ? parseInt(price[1]) : (price[1] = maxPrice)

      console.log('price :>> ', price)

      console.log('vendor', typeof vendor)

      // lay va xu ly may thang filter o day
      // ve title thi nen xu ly sau theo search input.

      return await Repository.find({
        page: _page,
        limit: _limit,
        status: _status,
        priceLow: _priceLow,
        priceHigh: _priceHigh,
      })
    } catch (error) {
      throw error
    }
  },

  findById: async (req) => {
    try {
      const { id } = req.params
      return await Repository.findById(id)
    } catch (error) {
      throw error
    }
  },

  create: async (req) => {
    try {
      const data = { ...req.body }

      return await Repository.create(data, req)
    } catch (error) {
      throw error
    }
  },

  update: async (req) => {
    try {
      const { id } = req.params
      const data = { ...req.body }

      return await Repository.update(id, data)
    } catch (error) {
      throw error
    }
  },

  delete: async (req) => {
    try {
      const { id } = req.params
      return await Repository.delete(id)
    } catch (error) {
      throw error
    }
  },
}
