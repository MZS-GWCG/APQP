const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const authenticate = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authenticate);

// Get all items (can be filtered by epicId in query)
router.get('/', itemController.getAllItems);

// Get item by ID
router.get('/:id', itemController.getItemById);

// Create item
router.post('/', itemController.createItem);

// Update item
router.put('/:id', itemController.updateItem);

// Delete item
router.delete('/:id', itemController.deleteItem);

module.exports = router;
