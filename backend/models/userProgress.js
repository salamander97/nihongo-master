// models/userProgress.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserProgress = sequelize.define('UserProgress', {
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
  level_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'JLPT_LEVELS',
      key: 'level_id'
    }
  },
  vocabulary_progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  grammar_progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  kanji_progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  reading_progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  listening_progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  overall_progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  last_study_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  study_streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'USER_PROGRESS',
  timestamps: true
});

module.exports = UserProgress;
