// models/userFlashcard.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserFlashcard = sequelize.define('UserFlashcard', {
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
  flashcard_type: {
    type: DataTypes.ENUM('vocabulary', 'grammar', 'kanji'),
    allowNull: false
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'ID của từ vựng, ngữ pháp hoặc kanji tương ứng'
  },
  front_content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Nội dung mặt trước (tiếng Nhật)'
  },
  back_content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Nội dung mặt sau (tiếng Việt hoặc giải thích)'
  },
  custom_content: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Nội dung tùy chỉnh bởi người dùng'
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Các thẻ phân loại, phân cách bởi dấu phẩy'
  },
  deck_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'FLASHCARD_DECKS',
      key: 'id'
    },
    comment: 'ID của bộ flashcard (nếu có)'
  }
}, {
  tableName: 'USER_FLASHCARDS',
  timestamps: true
});

module.exports = UserFlashcard;
