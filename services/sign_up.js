const { User } = require('../models');
const bcrypt = require('bcrypt');
const SignUpDto = require('../dtos/sign_up');

class SignUpService {

    /**
     * Sign up a new user and return a JWT
     * @param {Object} userData - { email, password, role }
     * @returns {Promise<Object>} - { email, role }
     */
    static async signUp(userData) {
        // Validate input
        const { error } = SignUpDto.signUpSchema.validate(userData);
        if (error) {
            throw new Error(`Validation error: ${error.details.map((e) => e.message).join(', ')}`);
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new Error('Email is already registered.');
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        // Create the user
        const user = await User.create(userData);


        return { "email": user.email, "role": user.role};
    }
}

module.exports = SignUpService;
