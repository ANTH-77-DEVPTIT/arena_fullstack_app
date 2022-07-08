import apiCaller from '../helpers/apiCaller.js'

const getCount = async () => {
  return await apiCaller(`/api/users/count`)
}

const find = async ({ page, limit }) => {
  let _page = page ? `&page=${page}` : ``
  let _limit = limit ? `&limit=${limit}` : ``

  return await apiCaller(`/api/users?${_page}${_limit}`)
}

const findById = async (id) => {
  return await apiCaller(`/api/users/${id}`)
}

const create = async (data) => {
  return await apiCaller(`/api/users`, 'POST', { product: data })
}

const update = async (id, data) => {
  return await apiCaller(`/api/users/${id}`, 'PUT', { product: data })
}

const _delete = async (id) => {
  return await apiCaller(`/api/users/${id}`, 'DELETE')
}

const UserApi = { getCount, find, findById, create, update, delete: _delete }

export default UserApi
