import express from 'express'
import CloudinaryUploader from '../connector/cloudinary/index.js'
import MulterUpload from '../connector/multer/index.js'
import ResponseHandler from '../helpers/responseHandler.js'

const router = express.Router()

router.post('/', MulterUpload.fields([{ name: 'images', maxCount: 10 }]), async (req, res) => {
  try {
    let images = []

    if (req.files.images) {
      for (let i = 0; i < req.files.images.length; i++) {
        let file = await CloudinaryUploader.upload(req.files.images[i])
        images.push(file)
      }
      images = images.map((item) => item.secure_url)
    }

    return ResponseHandler.success(res, images)
  } catch (error) {
    return ResponseHandler.error(res, error)
  }
})

// router.post('/destroy', (req, res) => {})

export default router
