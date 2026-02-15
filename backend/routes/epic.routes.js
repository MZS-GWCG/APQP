const express = require('express');
const router = express.Router();
const epicController = require('../controllers/epic.controller');
const authenticate = require('../middleware/auth.middleware');
const { isAdminOrManager } = require('../middleware/rbac.middleware');

// All routes require authentication
router.use(authenticate);

// Get all epics (can be filtered by projectId or partId in query)
router.get('/', epicController.getAllEpics);

// Get epic by ID
router.get('/:id', epicController.getEpicById);

// Create epic (admin or manager only)
router.post('/', isAdminOrManager, epicController.createEpic);

// Update epic (admin or manager only)
router.put('/:id', isAdminOrManager, epicController.updateEpic);

// Delete epic (admin or manager only)
router.delete('/:id', isAdminOrManager, epicController.deleteEpic);

module.exports = router;
