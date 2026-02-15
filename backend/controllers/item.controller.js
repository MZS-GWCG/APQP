const db = require('../config/database');

/**
 * Get all items (optionally filtered by epic)
 */
const getAllItems = async (req, res) => {
  try {
    const { epicId } = req.query;
    
    const whereClause = epicId ? { epicId } : {};

    const items = await db.Item.findAll({
      where: whereClause,
      include: [
        {
          model: db.Epic,
          as: 'epic',
          attributes: ['id', 'name', 'phase', 'status'],
          include: [{
            model: db.Project,
            as: 'project',
            attributes: ['id', 'name']
          }]
        },
        {
          model: db.User,
          as: 'assignee',
          attributes: ['id', 'username', 'email', 'firstName', 'lastName']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { items }
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch items'
    });
  }
};

/**
 * Get item by ID
 */
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await db.Item.findByPk(id, {
      include: [
        {
          model: db.Epic,
          as: 'epic',
          include: [
            {
              model: db.Project,
              as: 'project'
            },
            {
              model: db.Part,
              as: 'part'
            }
          ]
        },
        {
          model: db.User,
          as: 'assignee',
          attributes: ['id', 'username', 'email', 'firstName', 'lastName']
        }
      ]
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: { item }
    });
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch item'
    });
  }
};

/**
 * Create new item
 */
const createItem = async (req, res) => {
  try {
    const { epicId, name, description, status, priority, assignedTo, dueDate } = req.body;

    // Verify epic exists
    const epic = await db.Epic.findByPk(epicId);
    if (!epic) {
      return res.status(404).json({
        success: false,
        message: 'Epic not found'
      });
    }

    // Verify user exists if assignedTo is provided
    if (assignedTo) {
      const user = await db.User.findByPk(assignedTo);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Assigned user not found'
        });
      }
    }

    const item = await db.Item.create({
      epicId,
      name,
      description,
      status,
      priority,
      assignedTo,
      dueDate
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: { item }
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create item'
    });
  }
};

/**
 * Update item
 */
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, priority, assignedTo, dueDate, completedDate } = req.body;

    const item = await db.Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Verify user exists if assignedTo is provided
    if (assignedTo) {
      const user = await db.User.findByPk(assignedTo);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Assigned user not found'
        });
      }
    }

    await item.update({
      name,
      description,
      status,
      priority,
      assignedTo,
      dueDate,
      completedDate
    });

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: { item }
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update item'
    });
  }
};

/**
 * Delete item
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await db.Item.findByPk(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    await item.destroy();

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete item'
    });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
