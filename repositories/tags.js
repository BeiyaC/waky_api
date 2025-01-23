const { Tag } = require('../models');
const { Op } = require('sequelize');
const TagDto = require('../dtos/tags');

class TagRepository {

    /**
     * Create a new tag
     * @param {Object} tagData
     * @returns {Promise<Tag>}
     */
    static async createTag(tagData) {
        // Validate input
        const { error } = TagDto.createTagSchema.validate(tagData);
        if (error) {
            throw new Error(`Validation error: ${error.details.map((e) => e.message).join(', ')}`);
        }

        return await Tag.create(tagData);
    }

    /**
     * Get all tags with optional filters and pagination
     * @param {Object} filters - Filters for querying tags
     * @param {number} page - Current page number
     * @param {number} limit - Number of items per page (default: 10)
     * @returns {Promise<{ rows: Tag[], count: number }>}
     */
    static async getTags(filters = {}, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const where = {};

        // Apply filters
        if (filters.name) {
            where.name = { [Op.like]: `%${filters.name}%` };
        }

        const result = await Tag.findAndCountAll({
            where,
            limit,
            offset,
        });

        return result;
    }

    /**
     * Get a tag by ID
     * @param {number} tagId
     * @returns {Promise<Tag>}
     */
    static async getTagById(tagId) {
        return await Tag.findByPk(tagId);
    }

    /**
     * Update a tag by ID
     * @param {number} tagId
     * @param {Object} updateData
     * @returns {Promise<[number, Tag[]]>}
     */
    static async updateTag(tagId, updateData) {
        // Validate input
        const { error } = TagDto.updateTagSchema.validate(updateData);
        if (error) {
            throw new Error(`Validation error: ${error.details.map((e) => e.message).join(', ')}`);
        }

        return await Tag.update(updateData, {
            where: { id: tagId },
            returning: true,
        });
    }

    /**
     * Delete a tag by ID
     * @param {number} tagId
     * @returns {Promise<number>} - Number of rows deleted
     */
    static async deleteTag(tagId) {
        return await Tag.destroy({ where: { id: tagId } });
    }
}

module.exports = TagRepository;