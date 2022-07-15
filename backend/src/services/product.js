import CloudinaryUploader from '../connector/cloudinary/index.js'
import Repository from '../repositories/product.js'

const PAGE = 1
const LIMIT = 5

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
      const { page, limit } = req.query

      let _page = parseInt(page) ? parseInt(page) : PAGE
      let _limit = parseInt(limit) ? parseInt(limit) : LIMIT

      return await Repository.find({ page: _page, limit: _limit })
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

      if (req.files.thumbnail) {
        let file = await CloudinaryUploader.upload(req.files.thumbnail[0])

        data.thumbnail = file.secure_url
      } else {
        data.thumbnail = ''
      }

      if (req.files.images) {
        let files = []
        for (let i = 0; i < req.files.images.length; i++) {
          let file = await CloudinaryUploader.upload(req.files.images[i])
          files.push(file)
        }
        data.images = files.map((item) => item.secure_url)
      } else {
        data.images = []
      }
      return await Repository.create(data)
    } catch (error) {
      throw error
    }
  },

  update: async (req) => {
    try {
      const { id } = req.params
      const data = { ...req.body }

      if (req.files.thumbnail) {
        let file = await CloudinaryUploader.upload(req.files.thumbnail[0])

        data.thumbnail = file.secure_url
      } else {
        data.thumbnail = ''
      }

      if (req.files.images) {
        let files = []
        for (let i = 0; i < req.files.images.length; i++) {
          let file = await CloudinaryUploader.upload(req.files.images[i])
          files.push(file)
        }
        data.images = files.map((item) => item.secure_url)
      } else {
        data.images = []
      }

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
