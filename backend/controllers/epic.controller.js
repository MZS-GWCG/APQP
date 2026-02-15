const db = require('../config/database');

/**
 * Get all epics (optionally filtered by project or part)
 */
const getAllEpics = async (req, res) => {
  try {
    const { projectId, partId } = req.query;
    
    const whereClause = {};
    if (projectId) whereClause.projectId = projectId;
    if (partId) whereClause.partId = partId;

    const epics = await db.Epic.findAll({
      where: whereClause,
      include: [
        {
          model: db.Project,
          as: 'project',
          attributes: ['id', 'name']
        },
        {
          model: db.Part,
          as: 'part',
          attributes: ['id', 'name']
        },
        {
          model: db.Item,
          as: 'items',
          attributes: ['id', 'name', 'status']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { epics }
    });
  } catch (error) {
    console.error('Get epics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch epics'
    });
  }
};

/**
 * Get epic by ID
 */
const getEpicById = async (req, res) => {
  try {
    const { id } = req.params;

    const epic = await db.Epic.findByPk(id, {
      include: [
        {
          model: db.Project,
          as: 'project'
        },
        {
          model: db.Part,
          as: 'part'
        },
        {
          model: db.Item,
          as: 'items',
          include: [{
            model: db.User,
            as: 'assignee',
            attributes: ['id', 'username', 'email', 'firstName', 'lastName']
          }]
        }
      ]
    });

    if (!epic) {
      return res.status(404).json({
        success: false,
        message: 'Epic not found'
      });
    }

    res.json({
      success: true,
      data: { epic }
    });
  } catch (error) {
    console.error('Get epic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch epic'
    });
  }
};

/**
 * Create new epic
 */
const createEpic = async (req, res) => {
  try {
    const { projectId, partId, name, description, phase, status, startDate, dueDate } = req.body;

    // Verify project exists
    const project = await db.Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Verify part exists if partId is provided
    if (partId) {
      const part = await db.Part.findByPk(partId);
      if (!part) {
        return res.status(404).json({
          success: false,
          message: 'Part not found'
        });
      }
    }

    const epic = await db.Epic.create({
      projectId,
      partId,
      name,
      description,
      phase,
      status,
      startDate,
      dueDate
    });

    res.status(201).json({
      success: true,
      message: 'Epic created successfully',
      data: { epic }
    });
  } catch (error) {
    console.error('Create epic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create epic'
    });
  }
};

/**
 * Update epic
 */
const updateEpic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, phase, status, startDate, dueDate } = req.body;

    const epic = await db.Epic.findByPk(id);

    if (!epic) {
      return res.status(404).json({
        success: false,
        message: 'Epic not found'
      });
    }

    await epic.update({
      name,
      description,
      phase,
      status,
      startDate,
      dueDate
    });

    res.json({
      success: true,
      message: 'Epic updated successfully',
      data: { epic }
    });
  } catch (error) {
    console.error('Update epic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update epic'
    });
  }
};

/**
 * Delete epic
 */
const deleteEpic = async (req, res) => {
  try {
    const { id } = req.params;

    const epic = await db.Epic.findByPk(id);

    if (!epic) {
      return res.status(404).json({
        success: false,
        message: 'Epic not found'
      });
    }

    await epic.destroy();

    res.json({
      success: true,
      message: 'Epic deleted successfully'
    });
  } catch (error) {
    console.error('Delete epic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete epic'
    });
  }
};

module.exports = {
  getAllEpics,
  getEpicById,
  createEpic,
  updateEpic,
  deleteEpic
};
