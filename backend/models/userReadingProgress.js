// models/userReadingProgress.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserReadingProgress = sequelize.define('UserReadingProgress', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  reading_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'READING_EXERCISES',
      key: 'reading_id'
    }
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  completion_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'USER_READING_PROGRESS',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'reading_id']
    }
  ]
});

module.exports = UserReadingProgress;

