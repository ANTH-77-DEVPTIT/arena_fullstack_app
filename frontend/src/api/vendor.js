import apiCaller from '../helpers/apiCaller.js'

const find = async () => {
  return await apiCaller(`/api/vendors`)
}

const VendorApi = { find }

export default VendorApi
