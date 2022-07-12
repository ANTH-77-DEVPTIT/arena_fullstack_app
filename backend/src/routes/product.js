import express from 'express'
import MulterUpload from './../connector/multer/index.js'
import Controller from '../controllers/product.js'
import ProductValidator from "../validator/product.js"

const router = express.Router()

router.get('/', Controller.find)
router.get('/:id', Controller.findById)
router.post(
  '/', 
  MulterUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  ProductValidator.create,
  Controller.create
)

router.put(
  '/:id', 
  MulterUpload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]), 
  ProductValidator.update,
  Controller.update
)

router.delete('/:id', Controller.delete)

console.log("a");
export default router

