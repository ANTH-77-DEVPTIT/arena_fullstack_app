import ResponseHandler  from "../helpers/responseHandler.js";
import Joi from "joi"

const schemaProduct = {
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(255).required(),
    handle: Joi.string().alphanum().min(1).max(255).required(),
    price: Joi.number().integer().min(1).max(1000000),
    publish: Joi.boolean(),
    status: Joi.any(),
    thumbnail: Joi.any(),
    images: Joi.any(),
    vendorId: Joi.number().integer().min(1).max(1000),
}

let createSchema = {}
Array.from([
    'title',
    'description',
    'handle',
    'price',
    'publish',
    'status',
    'thumbnail',
    'images',
    'vendorId'
]).forEach((key) => (createSchema[key] = schemaProduct[key]))
createSchema = Joi.object(createSchema)

let updateSchema = {};
Array.from([
    'title',
    'description',
    'handle',
    'price',
    'publish',
    'status',
    'thumbnail',
    'images',
    'vendorId'
]).forEach((key) => (updateSchema[key] = schemaProduct[key]))
updateSchema = Joi.object(updateSchema)

export default {
    create: async (req, res, next) => {
        try {
            await createSchema.validateAsync(req.body)
            
            next();
        } catch (error) {
            return ResponseHandler.error(res, error)
        }
    },

    update: async (req, res, next) => {
        try {
            await updateSchema.validateAsync(req.body)

            next();
        } catch (error) {
            return ResponseHandler.error(res, error)
        }
    }
}