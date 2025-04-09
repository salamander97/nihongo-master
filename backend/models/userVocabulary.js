// models/userVocabulary.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserVocabulary = sequelize.define('UserVocabulary', {
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
  vocab_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'VOCABULARY',
      key: 'vocab_id'
    }
  },
  srs_level: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Cấp độ trong hệ thống SRS (0-9)'
  },
  next_review: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  last_reviewed: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  times_correct: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  times_incorrect: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  mastered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'USER_VOCABULARY',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'vocab_id']
    }
  ]
});

module.exports = UserVocabulary;
