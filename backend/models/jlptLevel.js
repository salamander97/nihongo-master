const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JLPTLevel = sequelize.define('JLPTLevel', {
  level_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  level_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  time_estimate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vocab_count: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  kanji_count: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  grammar_points: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  roadmap: {
    type: DataTypes.JSON,
    allowNull: true
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true
  },
  exam_info: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'JLPT_LEVELS'
});

module.exports = JLPTLevel;
