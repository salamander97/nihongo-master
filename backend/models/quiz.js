// models/quiz.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quiz = sequelize.define('Quiz', {
  quiz_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  level_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'JLPT_LEVELS',
      key: 'level_id'
    }
  },
  quiz_type: {
    type: DataTypes.ENUM('vocabulary', 'grammar', 'kanji', 'reading', 'listening', 'overall'),
    allowNull: false
  },
  time_limit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Thời gian làm bài (phút)'
  },
  question_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_practice: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Là bài tập luyện (true) hoặc bài kiểm tra (false)'
  }
}, {
  tableName: 'QUIZZES',
  timestamps: true
});

module.exports = Quiz;
