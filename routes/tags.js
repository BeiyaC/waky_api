// TagRoutes.js

const express = require('express');
const TagRepository = require('../repositories/tags');

const router = express.Router();

/**
 * Create a new tag
 */
router.post('/', async (req, res) => {
    try {
        const tag = await TagRepository.createTag(req.body);
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Get all tags with filters and pagination
 */
router.get('/', async (req, res) => {
    try {
        const filters = {
            name: req.query.name,
        };
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

        const tags = await TagRepository.getTags(filters, page, limit);
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Get a single tag by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const tag = await TagRepository.getTagById(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Update a tag by ID
 */
router.put('/:id', async (req, res) => {
    try {
        const [updatedCount, updatedTags] = await TagRepository.updateTag(req.params.id, req.body);
        if (updatedCount === 0) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(200).json(updatedTags[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * Delete a tag by ID
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedCount = await TagRepository.deleteTag(req.params.id);
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;