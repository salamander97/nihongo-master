import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LevelOverview from '../components/jlpt/LevelOverview';
import VocabularySection from '../components/jlpt/VocabularySection';
import GrammarSection from '../components/jlpt/GrammarSection';
import KanjiSection from '../components/jlpt/KanjiSection';
import ListeningSection from '../components/jlpt/ListeningSection';
import ReadingSection from '../components/jlpt/ReadingSection';
import QuizSection from '../components/jlpt/QuizSection';

const JLPTLevelPage = ({ level }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [levelData, setLevelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dữ liệu cấp độ từ API
    fetchLevelData(level);
  }, [level]);

  const fetchLevelData = async (level) => {
    try {
      // Gọi API lấy dữ liệu
      const response = await fetch(`/api/jlpt/${level.toLowerCase()}`);
      const data = await response.json();
      setLevelData(data);
    } catch (error) {
      console.error('Error fetching level data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    if (loading) return <div className="loading">Đang tải...</div>;
    if (!levelData) return <div className="error">Không thể tải dữ liệu</div>;

    switch (activeTab) {
      case 'overview':
        return <LevelOverview levelData={levelData} />;
      case 'vocabulary':
        return <VocabularySection levelData={levelData} />;
      case 'grammar':
        return <GrammarSection levelData={levelData} />;
      case 'kanji':
        return <KanjiSection levelData={levelData} />;
      case 'listening':
        return <ListeningSection levelData={levelData} />;
      case 'reading':
        return <ReadingSection levelData={levelData} />;
      case 'quiz':
        return <QuizSection levelData={levelData} />;
      default:
        return <LevelOverview levelData={levelData} />;
    }
  };

  // Lấy các thông tin cho banner
  const getBannerInfo = () => {
    const bannerInfo = {
      N5: {
        title: 'JLPT N5 - Sơ cấp',
        description: 'Cấp độ cơ bản dành cho người mới bắt đầu học tiếng Nhật',
        color: 'var(--color-primary-light)'
      },
      N4: {
        title: 'JLPT N4 - Sơ trung cấp',
        description: 'Củng cố kiến thức cơ bản và mở rộng vốn từ vựng',
        color: '#E6F7FF'
      },
      N3: {
        title: 'JLPT N3 - Trung cấp',
        description: 'Nâng cao khả năng giao tiếp trong nhiều tình huống',
        color: '#FFFBE6'
      },
      N2: {
        title: 'JLPT N2 - Cao cấp',
        description: 'Sử dụng tiếng Nhật thành thạo trong công việc và cuộc sống',
        color: '#FFF7E6'
      },
      N1: {
        title: 'JLPT N1 - Chuyên gia',
        description: 'Thành thạo tiếng Nhật ở mức cao nhất',
        color: '#FFF1F0'
      }
    };
    
    return bannerInfo[level] || bannerInfo.N5;
  };

  const bannerInfo = getBannerInfo();

  return (
    <div className="jlpt-level-page">
      {/* Banner */}
      <div 
        className="level-banner" 
        style={{ backgroundColor: bannerInfo.color }}
      >
        <div className="container">
          <h1>{bannerInfo.title}</h1>
          <p>{bannerInfo.description}</p>
          
          {/* Progress bar nếu user đã đăng nhập */}
          <div className="level-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: '35%' }}
              ></div>
            </div>
            <span className="progress-text">35% hoàn thành</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container">
        <div className="level-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Tổng quan
          </button>
          <button 
            className={`tab-btn ${activeTab === 'vocabulary' ? 'active' : ''}`}
            onClick={() => setActiveTab('vocabulary')}
          >
            Từ vựng
          </button>
          <button 
            className={`tab-btn ${activeTab === 'grammar' ? 'active' : ''}`}
            onClick={() => setActiveTab('grammar')}
          >
            Ngữ pháp
          </button>
          <button 
            className={`tab-btn ${activeTab === 'kanji' ? 'active' : ''}`}
            onClick={() => setActiveTab('kanji')}
          >
            Kanji
          </button>
          <button 
            className={`tab-btn ${activeTab === 'listening' ? 'active' : ''}`}
            onClick={() => setActiveTab('listening')}
          >
            Luyện nghe
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reading' ? 'active' : ''}`}
            onClick={() => setActiveTab('reading')}
          >
            Đọc hiểu
          </button>
          <button 
            className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            Bài kiểm tra
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>

      {/* AI Chat Button - đã có trong code gốc */}
      <div className="chat-btn">
        <i className="fas fa-comment-dots"></i>
      </div>
    </div>
  );
};

export default JLPTLevelPage;
