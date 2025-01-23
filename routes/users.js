const express = require('express');
const UserRepository = require('../repositories/users');

const router = express.Router();

const { verifyJWT, checkAdmin } = require('../middlewares/auth');


/**
 * Create a new user
 */
router.post('/', checkAdmin, async (req, res) => {
  try {
    const user = await UserRepository.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Get all users
 */
router.get('/', checkAdmin, async (req, res) => {
  try {
    const users = await UserRepository.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Get a single user by ID
 */
router.get('/:id', checkAdmin, async (req, res) => {
  try {
    const user = await UserRepository.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Update a user by ID
 */
router.put('/:id', verifyJWT, checkAdmin, async (req, res) => {
  try {
    const [updatedCount, updatedUsers] = await UserRepository.updateUser(req.params.id, req.body);
    if (updatedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUsers[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * Delete a user by ID
 */
router.delete('/:id', checkAdmin, async (req, res) => {
  try {
    const deletedCount = await UserRepository.deleteUser(req.params.id);
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;