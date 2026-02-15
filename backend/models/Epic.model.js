module.exports = (sequelize, DataTypes) => {
  const Epic = sequelize.define('Epic', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'project_id',
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    partId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'part_id',
      references: {
        model: 'parts',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phase: {
      type: DataTypes.ENUM('plan', 'design', 'develop', 'validate', 'launch'),
      allowNull: false,
      comment: 'APQP Phase: Plan and Define, Product Design, Process Design, Product and Process Validation, Launch'
    },
    status: {
      type: DataTypes.ENUM('not_started', 'in_progress', 'completed', 'blocked'),
      defaultValue: 'not_started',
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_date'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'due_date'
    }
  }, {
    tableName: 'epics',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Epic;
};
