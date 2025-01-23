const Joi = require('joi');

class UserDto {
    /**
     * Validation schema for creating a user
     */
    static createUserSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).required(),
        role: Joi.string().valid('customer', 'admin').optional(),
    });

    /**
     * Validation schema for updating a user
     */
    static updateUserSchema = Joi.object({
        email: Joi.string().email().optional(),
        password: Joi.string().min(8).max(255).optional(),
        role: Joi.string().valid('customer', 'admin').optional(),
        validate_email: Joi.boolean().optional(),
    }).min(1); // Ensure at least one field is being updated

}

module.exports = UserDto;