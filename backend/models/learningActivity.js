// models/learningActivity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LearningActivity = sequelize.define('LearningActivity', {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time_spent: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Thời gian học tập (phút)'
  },
  items_learned: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Số mục học mới'
  },
  items_reviewed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Số mục ôn tập'
  },
  activity_type: {
    type: DataTypes.ENUM('vocabulary', 'grammar', 'kanji', 'reading', 'listening', 'quiz', 'mixed'),
    allowNull: false,
    defaultValue: 'mixed'
  }
}, {
  tableName: 'LEARNING_ACTIVITIES',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'date', 'activity_type']
    }
  ]
});

module.exports = LearningActivity;
