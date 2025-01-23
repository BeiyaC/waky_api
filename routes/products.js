// ProductRoutes.js

const express = require('express');
const ProductRepository = require('../repositories/products');

const router = express.Router();

/**
 * Create a new product
 */
router.post('/', async (req, res) => {
    try {
        const product = await ProductRepository.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Get all products with filters and pagination
 */
router.get('/', async (req, res) => {
    try {
        const filters = {
            title: req.query.title,
            minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
            maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
            minStock: req.query.minStock ? parseInt(req.query.minStock, 10) : undefined,
            maxStock: req.query.maxStock ? parseInt(req.query.maxStock, 10) : undefined,
            tags: req.query.tags ? req.query.tags.split(',') : undefined,
        };
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

        const products = await ProductRepository.getProducts(filters, page, limit);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Get a single product by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const product = await ProductRepository.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Update a product by ID
 */
router.put('/:id', async (req, res) => {
    try {
        const [updatedCount, updatedProducts] = await ProductRepository.updateProduct(req.params.id, req.body);
        if (updatedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updatedProducts[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Delete a product by ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedCount = await ProductRepository.deleteProduct(req.params.id);
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;