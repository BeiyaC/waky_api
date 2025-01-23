const Joi = require("joi");

class TagDto {

    static createTagSchema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
    });

    static updateTagSchema = Joi.object({
        name: Joi.string().min(3).max(255).optional(),
    }).min(1); // Ensure at least one field is being updated

}

module.exports = TagDto