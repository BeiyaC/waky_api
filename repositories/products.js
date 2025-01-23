const { Product, Tag } = require('../models');
const { Op } = require('sequelize');
const ProductDto = require('../dtos/products');

class ProductRepository {

    /**
     * Create a new product
     * @param {Object} productData
     * @returns {Promise<Product>}
     */
    static async createProduct(productData) {
        // Validate input
        const {error} = ProductDto.createProductSchema.validate(productData);
        if (error) {
            throw new Error(`Validation error: ${error.details.map((e) => e.message).join(', ')}`);
        }

        await this.verifyTags(productData);

        return await Product.create(productData);
    }

    /**
     * Get all products with optional filters and pagination
     * @param {Object} filters - Filters for querying products
     * @param {number} page - Current page number
     * @param {number} limit - Number of items per page (default: 10)
     * @returns {Promise<{ rows: Product[], count: number }>}
     */
    static async getProducts(filters = {}, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const where = {};

        // Apply filters
        if (filters.title) {
            where.title = {[Op.like]: `%${filters.title}%`};
        }
        if (filters.minPrice || filters.maxPrice) {
            where.price = {};
            if (filters.minPrice) where.price[Op.gte] = filters.minPrice;
            if (filters.maxPrice) where.price[Op.lte] = filters.maxPrice;
        }
        if (filters.minStock || filters.maxStock) {
            where.stock = {};
            if (filters.minStock) where.stock[Op.gte] = filters.minStock;
            if (filters.maxStock) where.stock[Op.lte] = filters.maxStock;
        }

        // Query with tags if provided
        let include = [];
        if (filters.tags && filters.tags.length > 0) {
            include.push({
                model: Tag,
                where: {name: {[Op.in]: filters.tags}},
                through: {attributes: []}, // Exclude join table attributes
            });
        }

        const result = await Product.findAndCountAll({
            where,
            include,
            limit,
            offset,
        });
        return result;
    }

    /**
     * Get a product by ID
     * @param {number} productId
     * @returns {Promise<Product>}
     */
    static async getProductById(productId) {
        return await Product.findByPk(productId, {include: Tag});
    }

    /**
     * Update a product by ID
     * @param {number} productId
     * @param {Object} updateData
     * @returns {Promise<[number, Product[]]>}
     */
    static async updateProduct(productId, updateData) {
        // Validate input
        const {error} = ProductDto.updateProductSchema.validate(updateData);
        if (error) {
            throw new Error(`Validation error: ${error.details.map((e) => e.message).join(', ')}`);
        }

        return await Product.update(updateData, {
            where: {id: productId},
            returning: true,
        });
    }

    /**
     * Delete a product by ID
     * @param {number} productId
     * @returns {Promise<number>} - Number of rows deleted
     */
    static async deleteProduct(productId) {
        return await Product.destroy({where: {id: productId}});
    }

    /**
     * VerifyTags
     * @param {Object} productData
     * @returns {Promise<Array>}
     * @throws {Error} - If any tag is not found
     */
    static async verifyTags(productData) {
        // Check if all tags exist
        if (productData.tags && productData.tags.length > 0) {
            const existingTags = await Tag.findAll({
                where: {name: {[Op.in]: productData.tags}},
            });

            const existingTagNames = existingTags.map((tag) => tag.name);
            const missingTags = productData.tags.filter((tag) => !existingTagNames.includes(tag));

            if (missingTags.length > 0) {
                throw new Error(`The following tags do not exist: ${missingTags.join(', ')}`);
            }
        }

    }
}

module.exports = ProductRepository;
