const Joi = require("joi");

class LoginDto {
    /**
     * Validation schema for login credentials
     */
    static loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).required(),
    });
}

module.exports = LoginDto;