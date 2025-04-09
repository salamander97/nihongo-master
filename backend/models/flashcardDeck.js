// models/flashcardDeck.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FlashcardDeck = sequelize.define('FlashcardDeck', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  level_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'JLPT_LEVELS',
      key: 'level_id'
    }
  },
  card_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Có thể chia sẻ với người dùng khác'
  }
}, {
  tableName: 'FLASHCARD_DECKS',
  timestamps: true
});

module.exports = FlashcardDeck;
