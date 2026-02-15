const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const authenticate = require('../middleware/auth.middleware');
const { isAdminOrManager } = require('../middleware/rbac.middleware');

// All routes require authentication
router.use(authenticate);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get project by ID
router.get('/:id', projectController.getProjectById);

// Create project (admin or manager only)
router.post('/', isAdminOrManager, projectController.createProject);

// Update project (admin or manager only)
router.put('/:id', isAdminOrManager, projectController.updateProject);

// Delete project (admin or manager only)
router.delete('/:id', isAdminOrManager, projectController.deleteProject);

module.exports = router;
