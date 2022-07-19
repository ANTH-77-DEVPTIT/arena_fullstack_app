import apiCaller from '../helpers/apiCaller.js'

const upload = async (dataImg) => {
  const formData = new FormData()

  //   Object.keys(dataImg).filter(name => ['thumbnail'].includes(name)).forEach(name => formData.append('images', dataImg[name]))
  formData.append('images', dataImg['thumbnail'])

  if (dataImg.images?.length) {
    dataImg.images.forEach((item) => formData.append('images', item))
  }
  const imgURL = await apiCaller(`/api/uploads`, 'POST', formData)

  return imgURL
}

const UploadApi = {
  upload,
}

export default UploadApi
