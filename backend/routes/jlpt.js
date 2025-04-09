const express = require('express');
const router = express.Router();
const jlptController = require('../controllers/jlptController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes public (không cần đăng nhập)
router.get('/:level', jlptController.getLevelInfo);
router.get('/:level/vocabulary', jlptController.getVocabulary);
router.get('/:level/grammar', jlptController.getGrammar);
router.get('/:level/kanji', jlptController.getKanji);
router.get('/:level/reading', jlptController.getReadingExercises);
router.get('/:level/listening', jlptController.getListeningExercises);

// Routes yêu cầu xác thực
router.get('/:level/progress', authMiddleware, jlptController.getUserProgress);
router.post('/:level/quiz/submit', authMiddleware, jlptController.submitQuizResult);

module.exports = router;
