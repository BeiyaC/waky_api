const { User } = require('../models');
const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user');

class UserRepository {

    /**
     * Create a new user
     * @param {Object} userData
     * @param {boolean} isAdmin
     * @returns {Promise<User>}
     */
    static async createUser(userData, isAdmin) {
        // Validate input
        const { error } = UserDto.createUserSchema.validate(userData);
        if (error) {
            throw new Error(`Validation error: ${error.details.map((e) => e.message).join(', ')}`);
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        if(!isAdmin) {
            userData.role = 'customer';
        }

        return await User.create(userData);
    }

    /**
     * Get all users
     * @returns {Promise<User[]>}
     */
    static async getUsers() {
        return await User.findAll();
    }

    /**
     * Get a user by ID
     * @param {number} userId
     * @returns {Promise<User>}
     */
    static async getUserById(userId) {
        return await User.findByPk(userId);
    }

    /**
     * Update a user by ID
     * @param {number} userId
     * @param {Object} updateData
     * @returns {Promise<[number, User[]]>}
     */
    static async updateUser(userId, updateData) {
        // Validate input
        const { error } = UserDto.createUserSchema.validate(userData);
        if (error) {
            throw new Error(`Validation error: ${error.details.map((e) => e.message).join(', ')}`);
        }

        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }
        return await User.update(updateData, {
            where: { id: userId },
            returning: true,
        });
    }

    /**
     * Delete a user by ID
     * @param {number} userId
     * @returns {Promise<number>} - Number of rows deleted
     */
    static async deleteUser(userId) {
        return await User.destroy({ where: { id: userId } });
    }
}

module.exports = UserRepository;