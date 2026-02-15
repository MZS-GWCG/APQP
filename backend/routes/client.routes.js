const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const authenticate = require('../middleware/auth.middleware');
const { isAdminOrManager } = require('../middleware/rbac.middleware');

// All routes require authentication
router.use(authenticate);

// Get all clients
router.get('/', clientController.getAllClients);

// Get client by ID
router.get('/:id', clientController.getClientById);

// Create client (admin or manager only)
router.post('/', isAdminOrManager, clientController.createClient);

// Update client (admin or manager only)
router.put('/:id', isAdminOrManager, clientController.updateClient);

// Delete client (admin or manager only)
router.delete('/:id', isAdminOrManager, clientController.deleteClient);

module.exports = router;
