import express from 'express'
import MulterUpload from '../connector/multer/index.js'
import Controller from '../controllers/product.js'

const router = express.Router()

router.get('/', Controller.find)
router.get('/:id', Controller.findById)
router.get('/count', Controller.count)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)

export default router
