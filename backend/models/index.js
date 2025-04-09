// models/index.js
const User = require('./user');
const JLPTLevel = require('./jlptLevel');
const Vocabulary = require('./vocabulary');
const VocabularyExample = require('./vocabularyExample');
const Kanji = require('./kanji');
const KanjiVocabulary = require('./kanjiVocabulary');
const Grammar = require('./grammar');
const GrammarExample = require('./grammarExample');
const ReadingExercise = require('./readingExercise');
const ReadingVocabulary = require('./readingVocabulary');
const ReadingQuestion = require('./readingQuestion');
const ListeningExercise = require('./listeningExercise');
const ListeningQuestion = require('./listeningQuestion');
const UserProgress = require('./userProgress');
const UserVocabulary = require('./userVocabulary');
const UserGrammar = require('./userGrammar');
const UserKanji = require('./userKanji');
const UserFlashcard = require('./userFlashcard');
const FlashcardDeck = require('./flashcardDeck');
const Quiz = require('./quiz');
const QuizQuestion = require('./quizQuestion');
const QuizResult = require('./quizResult');
const UserReadingProgress = require('./userReadingProgress');
const UserListeningProgress = require('./userListeningProgress');
const LearningActivity = require('./learningActivity');
const UserStats = require('./userStats');

// Thiết lập mối quan hệ

// User relations
User.hasOne(UserStats, { foreignKey: 'user_id' });
UserStats.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(UserProgress, { foreignKey: 'user_id' });
UserProgress.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(UserVocabulary, { foreignKey: 'user_id' });
UserVocabulary.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(UserGrammar, { foreignKey: 'user_id' });
UserGrammar.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(UserKanji, { foreignKey: 'user_id' });
UserKanji.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(UserFlashcard, { foreignKey: 'user_id' });
UserFlashcard.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(FlashcardDeck, { foreignKey: 'user_id' });
FlashcardDeck.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(QuizResult, { foreignKey: 'user_id' });
QuizResult.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(LearningActivity, { foreignKey: 'user_id' });
LearningActivity.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(UserReadingProgress, { foreignKey: 'user_id' });
UserReadingProgress.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(UserListeningProgress, { foreignKey: 'user_id' });
UserListeningProgress.belongsTo(User, { foreignKey: 'user_id' });

// JLPT Level relations
JLPTLevel.hasMany(Vocabulary, { foreignKey: 'level_id' });
Vocabulary.belongsTo(JLPTLevel, { foreignKey: 'level_id' });

JLPTLevel.hasMany(Grammar, { foreignKey: 'level_id' });
Grammar.belongsTo(JLPTLevel, { foreignKey: 'level_id' });

JLPTLevel.hasMany(Kanji, { foreignKey: 'level_id' });
Kanji.belongsTo(JLPTLevel, { foreignKey: 'level_id' });

JLPTLevel.hasMany(ReadingExercise, { foreignKey: 'level_id' });
ReadingExercise.belongsTo(JLPTLevel, { foreignKey: 'level_id' });

JLPTLevel.hasMany(ListeningExercise, { foreignKey: 'level_id' });
ListeningExercise.belongsTo(JLPTLevel, { foreignKey: 'level_id' });

JLPTLevel.hasMany(Quiz, { foreignKey: 'level_id' });
Quiz.belongsTo(JLPTLevel, { foreignKey: 'level_id' });

JLPTLevel.hasMany(UserProgress, { foreignKey: 'level_id' });
UserProgress.belongsTo(JLPTLevel, { foreignKey: 'level_id' });

// Vocabulary relations
Vocabulary.hasMany(VocabularyExample, { foreignKey: 'vocab_id' });
VocabularyExample.belongsTo(Vocabulary, { foreignKey: 'vocab_id' });

Vocabulary.hasMany(KanjiVocabulary, { foreignKey: 'vocab_id' });
KanjiVocabulary.belongsTo(Vocabulary, { foreignKey: 'vocab_id' });

Vocabulary.hasMany(ReadingVocabulary, { foreignKey: 'vocab_id' });
ReadingVocabulary.belongsTo(Vocabulary, { foreignKey: 'vocab_id' });

Vocabulary.hasMany(UserVocabulary, { foreignKey: 'vocab_id' });
UserVocabulary.belongsTo(Vocabulary, { foreignKey: 'vocab_id' });

// Grammar relations
Grammar.hasMany(GrammarExample, { foreignKey: 'grammar_id' });
GrammarExample.belongsTo(Grammar, { foreignKey: 'grammar_id' });

Grammar.hasMany(UserGrammar, { foreignKey: 'grammar_id' });
UserGrammar.belongsTo(Grammar, { foreignKey: 'grammar_id' });

// Kanji relations
Kanji.hasMany(KanjiVocabulary, { foreignKey: 'kanji_id' });
KanjiVocabulary.belongsTo(Kanji, { foreignKey: 'kanji_id' });

Kanji.hasMany(UserKanji, { foreignKey: 'kanji_id' });
UserKanji.belongsTo(Kanji, { foreignKey: 'kanji_id' });

// Reading Exercise relations
ReadingExercise.hasMany(ReadingQuestion, { foreignKey: 'reading_id' });
ReadingQuestion.belongsTo(ReadingExercise, { foreignKey: 'reading_id' });

ReadingExercise.hasMany(ReadingVocabulary, { foreignKey: 'reading_id' });
ReadingVocabulary.belongsTo(ReadingExercise, { foreignKey: 'reading_id' });

ReadingExercise.hasMany(UserReadingProgress, { foreignKey: 'reading_id' });
UserReadingProgress.belongsTo(ReadingExercise, { foreignKey: 'reading_id' });

// Listening Exercise relations
ListeningExercise.hasMany(ListeningQuestion, { foreignKey: 'listening_id' });
ListeningQuestion.belongsTo(ListeningExercise, { foreignKey: 'listening_id' });

ListeningExercise.hasMany(UserListeningProgress, { foreignKey: 'listening_id' });
UserListeningProgress.belongsTo(ListeningExercise, { foreignKey: 'listening_id' });

// Quiz relations
Quiz.hasMany(QuizQuestion, { foreignKey: 'quiz_id' });
QuizQuestion.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Quiz.hasMany(QuizResult, { foreignKey: 'quiz_id' });
QuizResult.belongsTo(Quiz, { foreignKey: 'quiz_id' });

// FlashcardDeck relations
FlashcardDeck.hasMany(UserFlashcard, { foreignKey: 'deck_id' });
UserFlashcard.belongsTo(FlashcardDeck, { foreignKey: 'deck_id' });

module.exports = {
  User,
  JLPTLevel,
  Vocabulary,
  VocabularyExample,
  Kanji,
  KanjiVocabulary,
  Grammar,
  GrammarExample,
  ReadingExercise,
  ReadingVocabulary,
  ReadingQuestion,
  ListeningExercise,
  ListeningQuestion,
  UserProgress,
  UserVocabulary,
  UserGrammar,
  UserKanji,
  UserFlashcard,
  FlashcardDeck,
  Quiz,
  QuizQuestion,
  QuizResult,
  UserReadingProgress,
  UserListeningProgress,
  Lear
