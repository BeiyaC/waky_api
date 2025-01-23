const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginDto = require('../dtos/login');

class LoginService {

    /**
     * Login a user and return a JWT
     * @param {Object} credentials - { email, password }
     * @returns {Promise<string>} - JWT token
     */
    static async login(credentials) {
        // Validate input
        const { error } = LoginDto.loginSchema.validate(credentials);
        if (error) {
            throw new Error(`Validation error: ${error.details.map((e) => e.message).join(', ')}`);
        }

        // Check if user exists
        const user = await User.findOne({ where: { email: credentials.email } });
        if (!user) {
            throw new Error('Invalid email or password.');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password.');
        }

        // Generate JWT
        const token = jwt.sign(
            {
                email: user.email,
                isAdmin: user.role === 'admin',
            },
            process.env.JWT_PRIVATE_KEY, // Replace with your secret key
            {
                expiresIn: '1h', // Token expiration time
            }
        );

        return token;
    }
}

module.exports = LoginService;