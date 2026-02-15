const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'apqp_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('../models/User.model')(sequelize, Sequelize);
db.Client = require('../models/Client.model')(sequelize, Sequelize);
db.Project = require('../models/Project.model')(sequelize, Sequelize);
db.Part = require('../models/Part.model')(sequelize, Sequelize);
db.Epic = require('../models/Epic.model')(sequelize, Sequelize);
db.Item = require('../models/Item.model')(sequelize, Sequelize);

// Define relationships
// User relationships
db.User.hasMany(db.Item, { foreignKey: 'assigned_to', as: 'assignedItems' });

// Client relationships
db.Client.hasMany(db.Project, { foreignKey: 'client_id', as: 'projects', onDelete: 'CASCADE' });
db.Project.belongsTo(db.Client, { foreignKey: 'client_id', as: 'client' });

// Project relationships
db.Project.hasMany(db.Part, { foreignKey: 'project_id', as: 'parts', onDelete: 'CASCADE' });
db.Part.belongsTo(db.Project, { foreignKey: 'project_id', as: 'project' });

db.Project.hasMany(db.Epic, { foreignKey: 'project_id', as: 'epics', onDelete: 'CASCADE' });
db.Epic.belongsTo(db.Project, { foreignKey: 'project_id', as: 'project' });

// Part relationships
db.Part.hasMany(db.Epic, { foreignKey: 'part_id', as: 'epics', onDelete: 'CASCADE' });
db.Epic.belongsTo(db.Part, { foreignKey: 'part_id', as: 'part' });

// Epic relationships
db.Epic.hasMany(db.Item, { foreignKey: 'epic_id', as: 'items', onDelete: 'CASCADE' });
db.Item.belongsTo(db.Epic, { foreignKey: 'epic_id', as: 'epic' });

// Item relationships
db.Item.belongsTo(db.User, { foreignKey: 'assigned_to', as: 'assignee' });

module.exports = db;
