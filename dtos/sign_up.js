const Joi = require('joi');

class SignUpDto {
    /**
     * Validation schema for signing up
     */
    static signUpSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).required(),
        role: Joi.string().valid('customer').optional(),
    });
}

module.exports = SignUpDto;