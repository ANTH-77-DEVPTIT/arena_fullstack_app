import Model from '../models/product.js'
import VendorModel from '../models/vendor.js'
import generateSlug from '../helpers/generateSlug.js'

const include = [{ model: VendorModel, as: 'vendor' }]

export default {
  count: async () => {
    try {
      const count = await Model.count()
      console.log(count)
    } catch (error) {
      throw error
    }
  },

  find: async ({ page, limit }) => {
    try {
      const count = await Model.count()
      const items = await Model.findAll({
        limit,
        offset: (page - 1) * limit,
        include,
        order: [['id', 'DESC']], //cho nay se tuy bien khi client lua chon sap xep theo thang nao/
        //co the tang hoac giam  tuy bien user muon.
      })

      return {
        items,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        totalItems: count,
      }
    } catch (error) {
      throw error
    }
  },

  findById: async (idProduct) => {
    try {
      const entry = await Model.findOne({ where: { id: idProduct }, include })

      if (!entry) {
        throw new Error('Product Not Found!')
      }
      return await Model.findOne({ where: { id: idProduct }, include })
    } catch (error) {
      throw error
    }
  },

  create: async (dataProduct) => {
    try {
      const handleSlug = generateSlug(dataProduct.title)
      const handle = `${handleSlug}-${Date.now()}`

      const newData = { ...dataProduct, handle: handle }
      console.log('newData', newData)

      return await Model.create(newData)
    } catch (error) {
      throw error
    }
  },

  update: async (id, data) => {
    try {
      const entry = await Model.findOne({
        where: { id },
        include,
      })
      if (!entry) {
        throw new Error('Product Not Found!')
      }
      const handleSlug = generateSlug(data.title)

      const handle = `${handleSlug}-${Date.now()}`

      console.log(handle)
      const dataUpdate = { ...data, handle: handle }
      console.log(dataUpdate)

      await Model.update(dataUpdate, {
        where: { id },
        include,
        returning: true,
        plain: true,
      })

      return await Model.findOne({
        where: { id },
        include,
      })
    } catch (error) {
      throw error
    }
  },

  delete: async (id) => {
    try {
      const entry = await Model.findOne({ where: { id } })

      if (!entry) {
        throw new Error('Product Not Found!')
      }

      return await Model.destroy({ where: { id } })
    } catch (error) {
      throw error
    }
  },
}
