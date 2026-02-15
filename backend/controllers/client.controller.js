const db = require('../config/database');

/**
 * Get all clients
 */
const getAllClients = async (req, res) => {
  try {
    const clients = await db.Client.findAll({
      include: [{
        model: db.Project,
        as: 'projects',
        attributes: ['id', 'name', 'status']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { clients }
    });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clients'
    });
  }
};

/**
 * Get client by ID
 */
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await db.Client.findByPk(id, {
      include: [{
        model: db.Project,
        as: 'projects'
      }]
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.json({
      success: true,
      data: { client }
    });
  } catch (error) {
    console.error('Get client error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch client'
    });
  }
};

/**
 * Create new client
 */
const createClient = async (req, res) => {
  try {
    const { name, email, ppapLevel, contactPerson, phone, address } = req.body;

    const client = await db.Client.create({
      name,
      email,
      ppapLevel,
      contactPerson,
      phone,
      address
    });

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: { client }
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create client'
    });
  }
};

/**
 * Update client
 */
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, ppapLevel, contactPerson, phone, address, isActive } = req.body;

    const client = await db.Client.findByPk(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    await client.update({
      name,
      email,
      ppapLevel,
      contactPerson,
      phone,
      address,
      isActive
    });

    res.json({
      success: true,
      message: 'Client updated successfully',
      data: { client }
    });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update client'
    });
  }
};

/**
 * Delete client
 */
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await db.Client.findByPk(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    await client.destroy();

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete client'
    });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
