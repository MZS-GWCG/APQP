const express = require('express');
const router = express.Router();
const partController = require('../controllers/part.controller');
const authenticate = require('../middleware/auth.middleware');
const { isAdminOrManager } = require('../middleware/rbac.middleware');

// All routes require authentication
router.use(authenticate);

// Get all parts (can be filtered by projectId in query)
router.get('/', partController.getAllParts);

// Get part by ID
router.get('/:id', partController.getPartById);

// Create part (admin or manager only)
router.post('/', isAdminOrManager, partController.createPart);

// Update part (admin or manager only)
router.put('/:id', isAdminOrManager, partController.updatePart);

// Delete part (admin or manager only)
router.delete('/:id', isAdminOrManager, partController.deletePart);

module.exports = router;
