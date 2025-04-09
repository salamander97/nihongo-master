// models/userStats.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserStats = sequelize.define('UserStats', {
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
    },
    unique: true
  },
  current_streak: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Số ngày học liên tiếp hiện tại'
  },
  longest_streak: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Số ngày học liên tiếp dài nhất'
  },
  total_study_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  total_study_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: 'Tổng thời gian học (phút)'
  },
  total_items_learned: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  last_active_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  join_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'USER_STATS',
  timestamps: true
});

module.exports = UserStats;
