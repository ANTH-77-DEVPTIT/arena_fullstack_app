import apiCaller from '../helpers/apiCaller.js'

const find = async ({ page, limit }) => {
  let _page = page ? `&page=${page}` : ``
  let _limit = limit ? `&limit=${limit}` : ``

  return await apiCaller(`/api/products?${_page}${_limit}`)
}

const findById = async (id) => {
  return await apiCaller(`/api/products/${id}`)
}

const create = async (data) => {
  const formData = new FormData()

  const nameObj = Object.keys(data)

  nameObj
    .filter((name) => !['images'].includes(name))
    .forEach((name) => {
      return formData.append(name, data[name])
    })

  if (data.images?.length) {
    data.images.forEach((item) => formData.append('images', item))
  }

  return await apiCaller(`/api/products`, 'POST', formData, {
    'Content-Type': 'multipart/form-data',
  })
}

const update = async (id, data) => {
  const formData = new FormData()

  Object.keys(data)
    .filter((name) => !['images'].includes(name))
    .forEach((name) => formData.append(name, data[name]))

  if (data.images?.length) {
    data.images.forEach((item) => formData.append('images', item))
  }

  return await apiCaller(`/api/products/${id}`, 'PUT', formData)
}

const _delete = async (id) => {
  return await apiCaller(`/api/products/${id}`, 'DELETE')
}

const ProductApi = {
  find,
  findById,
  create,
  update,
  delete: _delete,
}

export default ProductApi
