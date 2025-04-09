// models/quizResult.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const QuizResult = sequelize.define('QuizResult', {
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
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'QUIZZES',
      key: 'quiz_id'
    }
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Số câu trả lời đúng'
  },
  total_questions: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Tổng số câu hỏi'
  },
  percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Tỷ lệ phần trăm đúng'
  },
  completion_time: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Thời gian hoàn thành (giây)'
  },
  date_taken: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  answers: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Lưu trữ câu trả lời của người dùng'
  }
}, {
  tableName: 'USER_QUIZ_RESULTS',
  timestamps: true
});

module.exports = QuizResult;
