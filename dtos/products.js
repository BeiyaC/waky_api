const Joi = require("joi");

class ProductDto {

    static createProductSchema = Joi.object({
        title: Joi.string().min(3).max(255).required(),
        price: Joi.number().positive().required(),
        description: Joi.string().allow(null, ''),
        stock: Joi.number().integer().min(0).required(),
        tags: Joi.array().items(Joi.string()).optional(),
    });

    static updateProductSchema = Joi.object({
        title: Joi.string().min(3).max(255).optional(),
        price: Joi.number().positive().optional(),
        description: Joi.string().allow(null, '').optional(),
        stock: Joi.number().integer().min(0).optional(),
        tags: Joi.array().items(Joi.string()).optional(),
    }).min(1); // Ensure at least one field is being updated
}

module.exports = ProductDto;