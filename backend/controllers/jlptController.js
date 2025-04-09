const JLPTLevel = require('../models/jlptLevel');
const Vocabulary = require('../models/vocabulary');
const Grammar = require('../models/grammar');
const Kanji = require('../models/kanji');
const ReadingExercise = require('../models/readingExercise');
const ListeningExercise = require('../models/listeningExercise');
const User = require('../models/user');
const UserProgress = require('../models/userProgress');
const QuizResult = require('../models/quizResult');

// Lấy thông tin cấp độ JLPT
exports.getLevelInfo = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Tìm level trong database
    const levelData = await JLPTLevel.findOne({
      where: { level_name: level.toUpperCase() }
    });
    
    if (!levelData) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    res.json(levelData);
  } catch (error) {
    console.error('Error fetching level info:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy danh sách từ vựng theo cấp độ
exports.getVocabulary = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Tìm level ID
    const levelData = await JLPTLevel.findOne({
      where: { level_name: level.toUpperCase() },
      attributes: ['level_id']
    });
    
    if (!levelData) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    // Lấy từ vựng theo level ID
    const vocabulary = await Vocabulary.findAll({
      where: { level_id: levelData.level_id }
    });
    
    res.json(vocabulary);
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy từ vựng theo chủ đề
exports.getVocabularyByTopic = async (req, res) => {
  try {
    const { level, topic } = req.params;
    
    // Tìm level ID
    const levelData = await JLPTLevel.findOne({
      where: { level_name: level.toUpperCase() },
      attributes: ['level_id']
    });
    
    if (!levelData) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    // Lấy từ vựng theo level ID và chủ đề
    const vocabulary = await Vocabulary.findAll({
      where: { 
        level_id: levelData.level_id,
        topic: topic
      }
    });
    
    res.json(vocabulary);
  } catch (error) {
    console.error('Error fetching vocabulary by topic:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy chi tiết từ vựng cụ thể
exports.getVocabularyDetail = async (req, res) => {
  try {
    const { vocabId } = req.params;
    
    // Lấy thông tin từ vựng
    const vocabulary = await Vocabulary.findByPk(vocabId, {
      include: [
        {
          model: JLPTLevel,
          attributes: ['level_name']
        }
      ]
    });
    
    if (!vocabulary) {
      return res.status(404).json({ message: 'Không tìm thấy từ vựng' });
    }
    
    // Lấy ví dụ của từ vựng
    const examples = await VocabularyExample.findAll({
      where: { vocab_id: vocabId }
    });
    
    // Kết hợp thông tin
    const result = {
      ...vocabulary.toJSON(),
      examples
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching vocabulary detail:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy danh sách ngữ pháp theo cấp độ
exports.getGrammar = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Tìm level ID
    const levelData = await JLPTLevel.findOne({
      where: { level_name: level.toUpperCase() },
      attributes: ['level_id']
    });
    
    if (!levelData) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    // Lấy ngữ pháp theo level ID
    const grammar = await Grammar.findAll({
      where: { level_id: levelData.level_id }
    });
    
    res.json(grammar);
  } catch (error) {
    console.error('Error fetching grammar:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy chi tiết ngữ pháp cụ thể
exports.getGrammarDetail = async (req, res) => {
  try {
    const { grammarId } = req.params;
    
    // Lấy thông tin ngữ pháp
    const grammar = await Grammar.findByPk(grammarId, {
      include: [
        {
          model: JLPTLevel,
          attributes: ['level_name']
        }
      ]
    });
    
    if (!grammar) {
      return res.status(404).json({ message: 'Không tìm thấy ngữ pháp' });
    }
    
    // Lấy ví dụ của ngữ pháp
    const examples = await GrammarExample.findAll({
      where: { grammar_id: grammarId }
    });
    
    // Kết hợp thông tin
    const result = {
      ...grammar.toJSON(),
      examples
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching grammar detail:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy danh sách Kanji theo cấp độ
exports.getKanji = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Tìm level ID
    const levelData = await JLPTLevel.findOne({
      where: { level_name: level.toUpperCase() },
      attributes: ['level_id']
    });
    
    if (!levelData) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    // Lấy Kanji theo level ID
    const kanji = await Kanji.findAll({
      where: { level_id: levelData.level_id }
    });
    
    res.json(kanji);
  } catch (error) {
    console.error('Error fetching kanji:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy chi tiết Kanji cụ thể
exports.getKanjiDetail = async (req, res) => {
  try {
    const { kanjiId } = req.params;
    
    // Lấy thông tin Kanji
    const kanji = await Kanji.findByPk(kanjiId, {
      include: [
        {
          model: JLPTLevel,
          attributes: ['level_name']
        }
      ]
    });
    
    if (!kanji) {
      return res.status(404).json({ message: 'Không tìm thấy Kanji' });
    }
    
    // Lấy từ vựng liên quan đến Kanji
    const relatedVocabulary = await KanjiVocabulary.findAll({
      where: { kanji_id: kanjiId },
      include: [
        {
          model: Vocabulary,
          attributes: ['vocab_id', 'kanji', 'hiragana', 'meaning']
        }
      ]
    });
    
    // Chuyển đổi dữ liệu
    const vocabulary = relatedVocabulary.map(item => item.Vocabulary);
    
    // Kết hợp thông tin
    const result = {
      ...kanji.toJSON(),
      vocabulary
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching kanji detail:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy danh sách bài đọc theo cấp độ
exports.getReadingExercises = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Tìm level ID
    const levelData = await JLPTLevel.findOne({
      where: { level_name: level.toUpperCase() },
      attributes: ['level_id']
    });
    
    if (!levelData) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    // Lấy bài đọc theo level ID
    const readings = await ReadingExercise.findAll({
      where: { level_id: levelData.level_id },
      attributes: ['reading_id', 'title', 'level_id']
    });
    
    res.json(readings);
  } catch (error) {
    console.error('Error fetching reading exercises:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy chi tiết bài đọc cụ thể
exports.getReadingExerciseDetail = async (req, res) => {
  try {
    const { readingId } = req.params;
    
    // Lấy thông tin bài đọc
    const reading = await ReadingExercise.findByPk(readingId, {
      include: [
        {
          model: JLPTLevel,
          attributes: ['level_name']
        }
      ]
    });
    
    if (!reading) {
      return res.status(404).json({ message: 'Không tìm thấy bài đọc' });
    }
    
    // Lấy câu hỏi của bài đọc
    const questions = await ReadingQuestion.findAll({
      where: { reading_id: readingId },
      attributes: ['question_id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d']
    });
    
    // Lấy từ vựng liên quan
    const vocabularyIds = await ReadingVocabulary.findAll({
      where: { reading_id: readingId },
      attributes: ['vocab_id']
    });
    
    const vocabIds = vocabularyIds.map(item => item.vocab_id);
    
    const vocabulary = await Vocabulary.findAll({
      where: { vocab_id: vocabIds }
    });
    
    // Kết hợp thông tin
    const result = {
      ...reading.toJSON(),
      questions,
      vocabulary
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching reading exercise detail:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy danh sách bài nghe theo cấp độ
exports.getListeningExercises = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Tìm level ID
    const levelData = await JLPTLevel.findOne({
      where: { level_name: level.toUpperCase() },
      attributes: ['level_id']
    });
    
    if (!levelData) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    // Lấy bài nghe theo level ID
    const listenings = await ListeningExercise.findAll({
      where: { level_id: levelData.level_id },
      attributes: ['listening_id', 'title', 'level_id']
    });
    
    res.json(listenings);
  } catch (error) {
    console.error('Error fetching listening exercises:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy chi tiết bài nghe cụ thể
exports.getListeningExerciseDetail = async (req, res) => {
  try {
    const { listeningId } = req.params;
    
    // Lấy thông tin bài nghe
    const listening = await ListeningExercise.findByPk(listeningId, {
      include: [
        {
          model: JLPTLevel,
          attributes: ['level_name']
        }
      ]
    });
    
    if (!listening) {
      return res.status(404).json({ message: 'Không tìm thấy bài nghe' });
    }
    
    // Lấy câu hỏi của bài nghe
    const questions = await ListeningQuestion.findAll({
      where: { listening_id: listeningId },
      attributes: ['question_id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d']
    });
    
    // Kết hợp thông tin
    const result = {
      ...listening.toJSON(),
      questions
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching listening exercise detail:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy danh sách bài kiểm tra theo cấp độ
exports.getQuizzes = async (req, res) => {
  try {
    const { level } = req.params;
    
    // Tìm level ID
    const levelData = await JLPTLevel.findOne({
      where: { level_name: level.toUpperCase() },
      attributes: ['level_id']
    });
    
    if (!levelData) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    // Lấy bài kiểm tra theo level ID
    const quizzes = await Quiz.findAll({
      where: { level_id: levelData.level_id },
      attributes: ['quiz_id', 'title', 'description', 'time_limit', 'quiz_type', 'level_id']
    });
    
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy chi tiết bài kiểm tra
exports.getQuizDetail = async (req, res) => {
  try {
    const { quizId } = req.params;
    
    // Lấy thông tin bài kiểm tra
    const quiz = await Quiz.findByPk(quizId, {
      include: [
        {
          model: JLPTLevel,
          attributes: ['level_name']
        }
      ]
    });
    
    if (!quiz) {
      return res.status(404).json({ message: 'Không tìm thấy bài kiểm tra' });
    }
    
    // Lấy câu hỏi của bài kiểm tra
    const questions = await QuizQuestion.findAll({
      where: { quiz_id: quizId },
      attributes: ['question_id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d']
    });
    
    // Kết hợp thông tin
    const result = {
      ...quiz.toJSON(),
      questions
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching quiz detail:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Nộp kết quả bài kiểm tra
exports.submitQuizResult = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers, totalTime } = req.body;
    const userId = req.user.id;
    
    // Lấy thông tin bài kiểm tra
    const quiz = await Quiz.findByPk(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Không tìm thấy bài kiểm tra' });
    }
    
    // Lấy đáp án đúng từ database
    const questions = await QuizQuestion.findAll({
      where: { quiz_id: quizId },
      attributes: ['question_id', 'correct_option']
    });
    
    // Tính điểm
    let score = 0;
    const correctAnswers = {};
    
    questions.forEach(question => {
      correctAnswers[question.question_id] = question.correct_option;
      
      if (answers[question.question_id] === question.correct_option) {
        score++;
      }
    });
    
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Lưu kết quả vào database
    const quizResult = await QuizResult.create({
      user_id: userId,
      quiz_id: quizId,
      score,
      total_questions: totalQuestions,
      completion_time: totalTime,
      date_taken: new Date()
    });
    
    // Cập nhật tiến độ người dùng
    await updateUserProgress(userId, quiz.level_id);
    
    // Trả về kết quả
    res.json({
      result: {
        id: quizResult.id,
        score,
        totalQuestions,
        percentage,
        correctAnswers
      }
    });
  } catch (error) {
    console.error('Error submitting quiz result:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy tiến độ của người dùng
exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { level } = req.params;
    
    // Tìm level ID
    const levelData = await JLPTLevel.findOne({
      where: { level_name: level.toUpperCase() },
      attributes: ['level_id']
    });
    
    if (!levelData) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    // Lấy tiến độ học tập
    const progress = await UserProgress.findOne({
      where: {
        user_id: userId,
        level_id: levelData.level_id
      }
    });
    
    if (!progress) {
      return res.json({
        progress: {
          vocabulary_progress: 0,
          grammar_progress: 0,
          kanji_progress: 0,
          reading_progress: 0,
          listening_progress: 0,
          overall_progress: 0
        }
      });
    }
    
    // Lấy kết quả bài kiểm tra
    const quizResults = await QuizResult.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Quiz,
          where: { level_id: levelData.level_id },
          attributes: ['quiz_type']
        }
      ],
      order: [['date_taken', 'DESC']]
    });
    
    // Tính điểm trung bình cho từng loại bài kiểm tra
    const quizScores = {
      vocabulary: [],
      grammar: [],
      kanji: [],
      reading: [],
      listening: [],
      overall: []
    };
    
    quizResults.forEach(result => {
      const quizType = result.Quiz.quiz_type;
      const score = (result.score / result.total_questions) * 100;
      
      if (quizType === 'vocabulary') {
        quizScores.vocabulary.push(score);
      } else if (quizType === 'grammar') {
        quizScores.grammar.push(score);
      } else if (quizType === 'kanji') {
        quizScores.kanji.push(score);
      } else if (quizType === 'reading') {
        quizScores.reading.push(score);
      } else if (quizType === 'listening') {
        quizScores.listening.push(score);
      } else if (quizType === 'overall') {
        quizScores.overall.push(score);
      }
    });
    
    // Tính điểm trung bình
    const calculateAverage = (scores) => {
      if (scores.length === 0) return 0;
      return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
    };
    
    const quizAverage = {
      vocabulary: calculateAverage(quizScores.vocabulary),
      grammar: calculateAverage(quizScores.grammar),
      kanji: calculateAverage(quizScores.kanji),
      reading: calculateAverage(quizScores.reading),
      listening: calculateAverage(quizScores.listening),
      overall: calculateAverage(quizScores.overall)
    };
    
    res.json({
      progress: {
        vocabulary_progress: progress.vocabulary_progress,
        grammar_progress: progress.grammar_progress,
        kanji_progress: progress.kanji_progress,
        reading_progress: progress.reading_progress,
        listening_progress: progress.listening_progress,
        overall_progress: progress.overall_progress
      },
      quiz_average: quizAverage,
      last_study_date: progress.last_study_date,
      study_streak: progress.study_streak
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy thông tin để ôn tập SRS (Spaced Repetition System)
exports.getSRSItems = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Lấy các từ vựng cần ôn tập hôm nay
    const today = new Date();
    const vocabularyToReview = await UserVocabulary.findAll({
      where: {
        user_id: userId,
        next_review: {
          [Op.lte]: today
        }
      },
      include: [
        {
          model: Vocabulary,
          include: [
            {
              model: JLPTLevel,
              attributes: ['level_name']
            }
          ]
        }
      ],
      limit: 20,
      order: [['next_review', 'ASC']]
    });
    
    // Lấy các ngữ pháp cần ôn tập hôm nay
    const grammarToReview = await UserGrammar.findAll({
      where: {
        user_id: userId,
        next_review: {
          [Op.lte]: today
        }
      },
      include: [
        {
          model: Grammar,
          include: [
            {
              model: JLPTLevel,
              attributes: ['level_name']
            }
          ]
        }
      ],
      limit: 10,
      order: [['next_review', 'ASC']]
    });
    
    // Lấy các Kanji cần ôn tập hôm nay
    const kanjiToReview = await UserKanji.findAll({
      where: {
        user_id: userId,
        next_review: {
          [Op.lte]: today
        }
      },
      include: [
        {
          model: Kanji,
          include: [
            {
              model: JLPTLevel,
              attributes: ['level_name']
            }
          ]
        }
      ],
      limit: 10,
      order: [['next_review', 'ASC']]
    });
    
    res.json({
      vocabulary: vocabularyToReview,
      grammar: grammarToReview,
      kanji: kanjiToReview
    });
  } catch (error) {
    console.error('Error fetching SRS items:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Cập nhật tiến độ SRS sau khi ôn tập
exports.updateSRSProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemType, itemId, difficulty } = req.body;
    
    // Tính toán ngày ôn tập tiếp theo dựa trên mức độ khó
    const calculateNextReview = (currentLevel, difficulty) => {
      const today = new Date();
      let days = 1;
      
      if (difficulty === 'easy') {
        days = currentLevel * 2;
      } else if (difficulty === 'medium') {
        days = currentLevel;
      } else if (difficulty === 'hard') {
        days = 1;
      }
      
      today.setDate(today.getDate() + days);
      return today;
    };
    
    let userItem;
    let newLevel;
    
    // Cập nhật thông tin SRS dựa trên loại item
    if (itemType === 'vocabulary') {
      userItem = await UserVocabulary.findOne({
        where: {
          user_id: userId,
          vocab_id: itemId
        }
      });
      
      if (!userItem) {
        return res.status(404).json({ message: 'Không tìm thấy từ vựng' });
      }
      
      // Tính toán cấp độ SRS mới
      newLevel = difficulty === 'hard' ? 1 : (difficulty === 'easy' ? userItem.srs_level + 1 : userItem.srs_level);
      
      // Cập nhật thông tin
      await userItem.update({
        srs_level: newLevel,
        next_review: calculateNextReview(newLevel, difficulty),
        last_reviewed: new Date()
      });
    } else if (itemType === 'grammar') {
      userItem = await UserGrammar.findOne({
        where: {
          user_id: userId,
          grammar_id: itemId
        }
      });
      
      if (!userItem) {
        return res.status(404).json({ message: 'Không tìm thấy ngữ pháp' });
      }
      
      // Tính toán cấp độ SRS mới
      newLevel = difficulty === 'hard' ? 1 : (difficulty === 'easy' ? userItem.srs_level + 1 : userItem.srs_level);
      
      // Cập nhật thông tin
      await userItem.update({
        srs_level: newLevel,
        next_review: calculateNextReview(newLevel, difficulty),
        last_reviewed: new Date()
      });
    } else if (itemType === 'kanji') {
      userItem = await UserKanji.findOne({
        where: {
          user_id: userId,
          kanji_id: itemId
        }
      });
      
      if (!userItem) {
        return res.status(404).json({ message: 'Không tìm thấy Kanji' });
      }
      
      // Tính toán cấp độ SRS mới
      newLevel = difficulty === 'hard' ? 1 : (difficulty === 'easy' ? userItem.srs_level + 1 : userItem.srs_level);
      
      // Cập nhật thông tin
      await userItem.update({
        srs_level: newLevel,
        next_review: calculateNextReview(newLevel, difficulty),
        last_reviewed: new Date()
      });
    } else {
      return res.status(400).json({ message: 'Loại item không hợp lệ' });
    }
    
    res.json({
      success: true,
      next_review: userItem.next_review,
      srs_level: newLevel
    });
  } catch (error) {
    console.error('Error updating SRS progress:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Hàm trợ giúp cập nhật tiến độ người dùng
const updateUserProgress = async (userId, levelId) => {
  try {
    // Tìm hoặc tạo mới bản ghi tiến độ
    let progress = await UserProgress.findOne({
      where: {
        user_id: userId,
        level_id: levelId
      }
    });
    
    if (!progress) {
      progress = await UserProgress.create({
        user_id: userId,
        level_id: levelId,
        vocabulary_progress: 0,
        grammar_progress: 0,
        kanji_progress: 0,
        reading_progress: 0,
        listening_progress: 0,
        overall_progress: 0,
        last_study_date: new Date(),
        study_streak: 1
      });
    } else {
      // Tính số ngày kể từ lần học cuối
      const lastStudyDate = new Date(progress.last_study_date);
      const today = new Date();
      const diffTime = Math.abs(today - lastStudyDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Cập nhật streak
      let newStreak = progress.study_streak;
      if (diffDays === 1) {
        // Học liên tiếp hàng ngày
        newStreak += 1;
      } else if (diffDays > 1) {
        // Bỏ lỡ ngày, reset streak
        newStreak = 1;
}
      
      // Cập nhật tiến độ học tập
      await progress.update({
        last_study_date: new Date(),
        study_streak: newStreak
      });
    }
    
    // Tính toán các tiến độ cụ thể
    await calculateProgress(userId, levelId);
    
    return progress;
  } catch (error) {
    console.error('Error updating user progress:', error);
    throw error;
  }
};

// Hàm tính toán tiến độ học tập của người dùng
const calculateProgress = async (userId, levelId) => {
  try {
    // Lấy tổng số từ vựng, ngữ pháp, kanji trong cấp độ
    const vocabularyCount = await Vocabulary.count({ where: { level_id: levelId } });
    const grammarCount = await Grammar.count({ where: { level_id: levelId } });
    const kanjiCount = await Kanji.count({ where: { level_id: levelId } });
    const readingCount = await ReadingExercise.count({ where: { level_id: levelId } });
    const listeningCount = await ListeningExercise.count({ where: { level_id: levelId } });
    
    // Lấy số lượng từ vựng, ngữ pháp, kanji đã học
    const learnedVocabulary = await UserVocabulary.count({
      where: { 
        user_id: userId,
        srs_level: { [Op.gt]: 0 }
      },
      include: [
        {
          model: Vocabulary,
          where: { level_id: levelId }
        }
      ]
    });
    
    const learnedGrammar = await UserGrammar.count({
      where: {
        user_id: userId,
        srs_level: { [Op.gt]: 0 }
      },
      include: [
        {
          model: Grammar,
          where: { level_id: levelId }
        }
      ]
    });
    
    const learnedKanji = await UserKanji.count({
      where: {
        user_id: userId,
        srs_level: { [Op.gt]: 0 }
      },
      include: [
        {
          model: Kanji,
          where: { level_id: levelId }
        }
      ]
    });
    
    // Lấy số lượng bài đọc, bài nghe đã hoàn thành
    const completedReadings = await UserReadingProgress.count({
      where: {
        user_id: userId,
        completed: true
      },
      include: [
        {
          model: ReadingExercise,
          where: { level_id: levelId }
        }
      ]
    });
    
    const completedListenings = await UserListeningProgress.count({
      where: {
        user_id: userId,
        completed: true
      },
      include: [
        {
          model: ListeningExercise,
          where: { level_id: levelId }
        }
      ]
    });
    
    // Tính phần trăm hoàn thành
    const vocabularyProgress = vocabularyCount > 0 ? Math.round((learnedVocabulary / vocabularyCount) * 100) : 0;
    const grammarProgress = grammarCount > 0 ? Math.round((learnedGrammar / grammarCount) * 100) : 0;
    const kanjiProgress = kanjiCount > 0 ? Math.round((learnedKanji / kanjiCount) * 100) : 0;
    const readingProgress = readingCount > 0 ? Math.round((completedReadings / readingCount) * 100) : 0;
    const listeningProgress = listeningCount > 0 ? Math.round((completedListenings / listeningCount) * 100) : 0;
    
    // Tính tổng tiến độ
    const overallProgress = Math.round(
      (vocabularyProgress + grammarProgress + kanjiProgress + readingProgress + listeningProgress) / 5
    );
    
    // Cập nhật vào database
    await UserProgress.update({
      vocabulary_progress: vocabularyProgress,
      grammar_progress: grammarProgress,
      kanji_progress: kanjiProgress,
      reading_progress: readingProgress,
      listening_progress: listeningProgress,
      overall_progress: overallProgress
    }, {
      where: {
        user_id: userId,
        level_id: levelId
      }
    });
  } catch (error) {
    console.error('Error calculating progress:', error);
    throw error;
  }
};

// Lấy đề xuất học tập
exports.getLearningRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Lấy cấp độ hiện tại của người dùng
    const user = await User.findByPk(userId, {
      attributes: ['current_level_id']
    });
    
    if (!user || !user.current_level_id) {
      return res.status(400).json({ message: 'Vui lòng chọn cấp độ học tập' });
    }
    
    // Lấy tiến độ người dùng
    const progress = await UserProgress.findOne({
      where: {
        user_id: userId,
        level_id: user.current_level_id
      },
      include: [
        {
          model: JLPTLevel,
          attributes: ['level_name']
        }
      ]
    });
    
    // Xác định lĩnh vực yếu nhất
    let weakestArea = 'vocabulary';
    let lowestProgress = progress ? progress.vocabulary_progress : 0;
    
    if (progress) {
      if (progress.grammar_progress < lowestProgress) {
        weakestArea = 'grammar';
        lowestProgress = progress.grammar_progress;
      }
      
      if (progress.kanji_progress < lowestProgress) {
        weakestArea = 'kanji';
        lowestProgress = progress.kanji_progress;
      }
      
      if (progress.reading_progress < lowestProgress) {
        weakestArea = 'reading';
        lowestProgress = progress.reading_progress;
      }
      
      if (progress.listening_progress < lowestProgress) {
        weakestArea = 'listening';
        lowestProgress = progress.listening_progress;
      }
    }
    
    // Lấy đề xuất dựa trên lĩnh vực yếu nhất
    let recommendation = {};
    
    if (weakestArea === 'vocabulary') {
      // Đề xuất từ vựng chưa học
      const vocabulary = await Vocabulary.findAll({
        where: { level_id: user.current_level_id },
        include: [
          {
            model: UserVocabulary,
            where: { user_id: userId },
            required: false
          }
        ],
        having: Sequelize.literal('COUNT(UserVocabulary.id) = 0'),
        group: ['Vocabulary.vocab_id'],
        limit: 10
      });
      
      recommendation = {
        type: 'vocabulary',
        title: 'Học từ vựng mới',
        description: 'Bạn nên học thêm từ vựng để cải thiện tiến độ',
        items: vocabulary
      };
    } else if (weakestArea === 'grammar') {
      // Đề xuất ngữ pháp chưa học
      const grammar = await Grammar.findAll({
        where: { level_id: user.current_level_id },
        include: [
          {
            model: UserGrammar,
            where: { user_id: userId },
            required: false
          }
        ],
        having: Sequelize.literal('COUNT(UserGrammar.id) = 0'),
        group: ['Grammar.grammar_id'],
        limit: 5
      });
      
      recommendation = {
        type: 'grammar',
        title: 'Học ngữ pháp mới',
        description: 'Bạn nên học thêm ngữ pháp để cải thiện tiến độ',
        items: grammar
      };
    } else if (weakestArea === 'kanji') {
      // Đề xuất kanji chưa học
      const kanji = await Kanji.findAll({
        where: { level_id: user.current_level_id },
        include: [
          {
            model: UserKanji,
            where: { user_id: userId },
            required: false
          }
        ],
        having: Sequelize.literal('COUNT(UserKanji.id) = 0'),
        group: ['Kanji.kanji_id'],
        limit: 5
      });
      
      recommendation = {
        type: 'kanji',
        title: 'Học Kanji mới',
        description: 'Bạn nên học thêm Kanji để cải thiện tiến độ',
        items: kanji
      };
    } else if (weakestArea === 'reading') {
      // Đề xuất bài đọc chưa làm
      const readings = await ReadingExercise.findAll({
        where: { level_id: user.current_level_id },
        include: [
          {
            model: UserReadingProgress,
            where: { 
              user_id: userId,
              completed: true
            },
            required: false
          }
        ],
        having: Sequelize.literal('COUNT(UserReadingProgress.id) = 0'),
        group: ['ReadingExercise.reading_id'],
        limit: 3
      });
      
      recommendation = {
        type: 'reading',
        title: 'Luyện đọc hiểu',
        description: 'Bạn nên luyện thêm đọc hiểu để cải thiện tiến độ',
        items: readings
      };
    } else if (weakestArea === 'listening') {
      // Đề xuất bài nghe chưa làm
      const listenings = await ListeningExercise.findAll({
        where: { level_id: user.current_level_id },
        include: [
          {
            model: UserListeningProgress,
            where: { 
              user_id: userId,
              completed: true
            },
            required: false
          }
        ],
        having: Sequelize.literal('COUNT(UserListeningProgress.id) = 0'),
        group: ['ListeningExercise.listening_id'],
        limit: 3
      });
      
      recommendation = {
        type: 'listening',
        title: 'Luyện nghe hiểu',
        description: 'Bạn nên luyện thêm nghe hiểu để cải thiện tiến độ',
        items: listenings
      };
    }
    
    // Lấy thêm các mục cần ôn tập hôm nay
    const today = new Date();
    const reviewItems = await getSRSReviewItems(userId, today);
    
    res.json({
      weak_area: {
        area: weakestArea,
        progress: lowestProgress
      },
      recommendation,
      review_items: reviewItems,
      level: progress ? progress.JLPTLevel.level_name : null,
      overall_progress: progress ? progress.overall_progress : 0
    });
  } catch (error) {
    console.error('Error getting learning recommendations:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Hàm lấy các mục cần ôn tập trong hệ thống SRS
const getSRSReviewItems = async (userId, date) => {
  try {
    // Lấy từ vựng cần ôn tập
    const vocabulary = await UserVocabulary.findAll({
      where: {
        user_id: userId,
        next_review: {
          [Op.lte]: date
        }
      },
      include: [
        {
          model: Vocabulary,
          attributes: ['vocab_id', 'kanji', 'hiragana', 'meaning']
        }
      ],
      limit: 10
    });
    
    // Lấy ngữ pháp cần ôn tập
    const grammar = await UserGrammar.findAll({
      where: {
        user_id: userId,
        next_review: {
          [Op.lte]: date
        }
      },
      include: [
        {
          model: Grammar,
          attributes: ['grammar_id', 'pattern', 'meaning']
        }
      ],
      limit: 5
    });
    
    // Lấy kanji cần ôn tập
    const kanji = await UserKanji.findAll({
      where: {
        user_id: userId,
        next_review: {
          [Op.lte]: date
        }
      },
      include: [
        {
          model: Kanji,
          attributes: ['kanji_id', 'character', 'meaning']
        }
      ],
      limit: 5
    });
    
    return {
      vocabulary: vocabulary.map(item => ({
        id: item.Vocabulary.vocab_id,
        kanji: item.Vocabulary.kanji,
        hiragana: item.Vocabulary.hiragana,
        meaning: item.Vocabulary.meaning,
        srs_level: item.srs_level
      })),
      grammar: grammar.map(item => ({
        id: item.Grammar.grammar_id,
        pattern: item.Grammar.pattern,
        meaning: item.Grammar.meaning,
        srs_level: item.srs_level
      })),
      kanji: kanji.map(item => ({
        id: item.Kanji.kanji_id,
        character: item.Kanji.character,
        meaning: item.Kanji.meaning,
        srs_level: item.srs_level
      }))
    };
  } catch (error) {
    console.error('Error getting SRS review items:', error);
    throw error;
  }
};

// API tìm kiếm
exports.search = async (req, res) => {
  try {
    const { query, type } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Vui lòng nhập từ khóa tìm kiếm' });
    }
    
    let results = {};
    
    // Tìm kiếm dựa vào loại nếu được chỉ định
    if (!type || type === 'all' || type === 'vocabulary') {
      // Tìm kiếm từ vựng
      const vocabulary = await Vocabulary.findAll({
        where: {
          [Op.or]: [
            { kanji: { [Op.like]: `%${query}%` } },
            { hiragana: { [Op.like]: `%${query}%` } },
            { romaji: { [Op.like]: `%${query}%` } },
            { meaning: { [Op.like]: `%${query}%` } }
          ]
        },
        include: [
          {
            model: JLPTLevel,
            attributes: ['level_name']
          }
        ],
        limit: 10
      });
      
      results.vocabulary = vocabulary;
    }
    
    if (!type || type === 'all' || type === 'grammar') {
      // Tìm kiếm ngữ pháp
      const grammar = await Grammar.findAll({
        where: {
          [Op.or]: [
            { pattern: { [Op.like]: `%${query}%` } },
            { meaning: { [Op.like]: `%${query}%` } },
            { formation: { [Op.like]: `%${query}%` } }
          ]
        },
        include: [
          {
            model: JLPTLevel,
            attributes: ['level_name']
          }
        ],
        limit: 10
      });
      
      results.grammar = grammar;
    }
    
    if (!type || type === 'all' || type === 'kanji') {
      // Tìm kiếm kanji
      const kanji = await Kanji.findAll({
        where: {
          [Op.or]: [
            { character: { [Op.like]: `%${query}%` } },
            { on_reading: { [Op.like]: `%${query}%` } },
            { kun_reading: { [Op.like]: `%${query}%` } },
            { meaning: { [Op.like]: `%${query}%` } }
          ]
        },
        include: [
          {
            model: JLPTLevel,
            attributes: ['level_name']
          }
        ],
        limit: 10
      });
      
      results.kanji = kanji;
    }
    
    res.json(results);
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// API thông kê học tập
exports.getLearningStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Lấy tiến độ của tất cả các cấp độ
    const progressByLevel = await UserProgress.findAll({
      where: { user_id: userId },
      include: [
        {
          model: JLPTLevel,
          attributes: ['level_name']
        }
      ]
    });
    
    // Thống kê hoạt động học tập trong 7 ngày gần đây
    const today = new Date();
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);
    
    const learningActivities = await LearningActivity.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.gte]: last7Days
        }
      },
      order: [['date', 'ASC']]
    });
    
    // Tạo mảng thống kê cho 7 ngày gần đây
    const activityStats = [];
    const dateLabels = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i));
      
      const dateString = date.toISOString().split('T')[0];
      dateLabels.push(dateString);
      
      const activity = learningActivities.find(act => 
        act.date.toISOString().split('T')[0] === dateString
      );
      
      activityStats.push({
        date: dateString,
        time_spent: activity ? activity.time_spent : 0,
        items_learned: activity ? activity.items_learned : 0,
        items_reviewed: activity ? activity.items_reviewed : 0
      });
    }
    
    // Thống kê tổng hợp
    const totalVocabulary = await UserVocabulary.count({
      where: { user_id: userId }
    });
    
    const totalGrammar = await UserGrammar.count({
      where: { user_id: userId }
    });
    
    const totalKanji = await UserKanji.count({
      where: { user_id: userId }
    });
    
    const totalQuizzes = await QuizResult.count({
      where: { user_id: userId }
    });
    
    // Lấy streak học tập
    const userStats = await UserStats.findOne({
      where: { user_id: userId }
    });
    
    const streak = userStats ? userStats.current_streak : 0;
    const longestStreak = userStats ? userStats.longest_streak : 0;
    
    res.json({
      progress_by_level: progressByLevel.map(p => ({
        level: p.JLPTLevel.level_name,
        overall_progress: p.overall_progress,
        vocabulary_progress: p.vocabulary_progress,
        grammar_progress: p.grammar_progress,
        kanji_progress: p.kanji_progress,
        reading_progress: p.reading_progress,
        listening_progress: p.listening_progress
      })),
      activity_stats: {
        dates: dateLabels,
        data: activityStats
      },
      summary: {
        total_vocabulary: totalVocabulary,
        total_grammar: totalGrammar,
        total_kanji: totalKanji,
        total_quizzes: totalQuizzes,
        current_streak: streak,
        longest_streak: longestStreak
      }
    });
  } catch (error) {
    console.error('Error getting learning stats:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Cập nhật cấp độ học tập của người dùng
exports.updateUserLevel = async (req, res) => {
  try {
    const userId = req.user.id;
    const { levelId } = req.body;
    
    // Kiểm tra cấp độ có tồn tại không
    const level = await JLPTLevel.findByPk(levelId);
    
    if (!level) {
      return res.status(404).json({ message: 'Không tìm thấy cấp độ' });
    }
    
    // Cập nhật cấp độ học tập
    await User.update({ current_level_id: levelId }, {
      where: { id: userId }
    });
    
    // Kiểm tra xem đã có bản ghi tiến độ cho cấp độ này chưa
    const existingProgress = await UserProgress.findOne({
      where: {
        user_id: userId,
        level_id: levelId
      }
    });
    
    // Nếu chưa có, tạo mới bản ghi tiến độ
    if (!existingProgress) {
      await UserProgress.create({
        user_id: userId,
        level_id: levelId,
        vocabulary_progress: 0,
        grammar_progress: 0,
        kanji_progress: 0,
        reading_progress: 0,
        listening_progress: 0,
        overall_progress: 0,
        last_study_date: new Date(),
        study_streak: 1
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật cấp độ học tập thành công',
      level: level.level_name
    });
  } catch (error) {
    console.error('Error updating user level:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
