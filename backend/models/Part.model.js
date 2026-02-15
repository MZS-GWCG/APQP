module.exports = (sequelize, DataTypes) => {
  const Part = sequelize.define('Part', {
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    partNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'part_number'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    revision: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'active', 'under_review', 'approved', 'obsolete'),
      defaultValue: 'draft',
      allowNull: false
    }
  }, {
    tableName: 'parts',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Part;
};
