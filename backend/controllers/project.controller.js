const db = require('../config/database');

/**
 * Get all projects
 */
const getAllProjects = async (req, res) => {
  try {
    const projects = await db.Project.findAll({
      include: [
        {
          model: db.Client,
          as: 'client',
          attributes: ['id', 'name', 'email']
        },
        {
          model: db.Part,
          as: 'parts',
          attributes: ['id', 'name', 'status']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { projects }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

/**
 * Get project by ID
 */
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await db.Project.findByPk(id, {
      include: [
        {
          model: db.Client,
          as: 'client'
        },
        {
          model: db.Part,
          as: 'parts'
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

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: { project }
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
};

/**
 * Create new project
 */
const createProject = async (req, res) => {
  try {
    const { name, description, status, clientId, startDate, targetDate } = req.body;

    // Verify client exists
    const client = await db.Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    const project = await db.Project.create({
      name,
      description,
      status,
      clientId,
      startDate,
      targetDate
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
};

/**
 * Update project
 */
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status, startDate, targetDate, completionDate } = req.body;

    const project = await db.Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.update({
      name,
      description,
      status,
      startDate,
      targetDate,
      completionDate
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
};

/**
 * Delete project
 */
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await db.Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
