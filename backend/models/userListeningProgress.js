// models/userListeningProgress.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserListeningProgress = sequelize.define('UserListeningProgress', {
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
  listening_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'LISTENING_EXERCISES',
      key: 'listening_id'
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
  tableName: 'USER_LISTENING_PROGRESS',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'listening_id']
    }
  ]
});

module.exports = UserListeningProgress;
