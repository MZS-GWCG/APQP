const db = require('../config/database');

/**
 * Get all parts (optionally filtered by project)
 */
const getAllParts = async (req, res) => {
  try {
    const { projectId } = req.query;
    
    const whereClause = projectId ? { projectId } : {};

    const parts = await db.Part.findAll({
      where: whereClause,
      include: [
        {
          model: db.Project,
          as: 'project',
          attributes: ['id', 'name', 'status']
        },
        {
          model: db.Epic,
          as: 'epics',
          attributes: ['id', 'name', 'status']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { parts }
    });
  } catch (error) {
    console.error('Get parts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch parts'
    });
  }
};

/**
 * Get part by ID
 */
const getPartById = async (req, res) => {
  try {
    const { id } = req.params;

    const part = await db.Part.findByPk(id, {
      include: [
        {
          model: db.Project,
          as: 'project'
        },
        {
          model: db.Epic,
          as: 'epics',
          include: [{
            model: db.Item,
            as: 'items'
          }]
        }
      ]
    });

    if (!part) {
      return res.status(404).json({
        success: false,
        message: 'Part not found'
      });
    }

    res.json({
      success: true,
      data: { part }
    });
  } catch (error) {
    console.error('Get part error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch part'
    });
  }
};

/**
 * Create new part
 */
const createPart = async (req, res) => {
  try {
    const { projectId, name, partNumber, description, revision, status } = req.body;

    // Verify project exists
    const project = await db.Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const part = await db.Part.create({
      projectId,
      name,
      partNumber,
      description,
      revision,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Part created successfully',
      data: { part }
    });
  } catch (error) {
    console.error('Create part error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create part'
    });
  }
};

/**
 * Update part
 */
const updatePart = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, partNumber, description, revision, status } = req.body;

    const part = await db.Part.findByPk(id);

    if (!part) {
      return res.status(404).json({
        success: false,
        message: 'Part not found'
      });
    }

    await part.update({
      name,
      partNumber,
      description,
      revision,
      status
    });

    res.json({
      success: true,
      message: 'Part updated successfully',
      data: { part }
    });
  } catch (error) {
    console.error('Update part error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update part'
    });
  }
};

/**
 * Delete part
 */
const deletePart = async (req, res) => {
  try {
    const { id } = req.params;

    const part = await db.Part.findByPk(id);

    if (!part) {
      return res.status(404).json({
        success: false,
        message: 'Part not found'
      });
    }

    await part.destroy();

    res.json({
      success: true,
      message: 'Part deleted successfully'
    });
  } catch (error) {
    console.error('Delete part error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete part'
    });
  }
};

module.exports = {
  getAllParts,
  getPartById,
  createPart,
  updatePart,
  deletePart
};
