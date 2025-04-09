// models/quizQuestion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const QuizQuestion = sequelize.define('QuizQuestion', {
  question_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'QUIZZES',
      key: 'quiz_id'
    }
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  question_type: {
    type: DataTypes.ENUM('multiple_choice', 'fill_blank', 'true_false', 'matching'),
    defaultValue: 'multiple_choice'
  },
  option_a: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  option_b: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  option_c: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  option_d: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  correct_option: {
    type: DataTypes.STRING,
    allowNull: false
  },
  explanation: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Giải thích cho đáp án đúng'
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'medium'
  }
}, {
  tableName: 'QUIZ_QUESTIONS',
  timestamps: true
});

module.exports = QuizQuestion;
