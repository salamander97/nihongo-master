import React from 'react';
import { Link } from 'react-router-dom';

const LevelOverview = ({ levelData }) => {
  // Destructure level data
  const { level, description, timeEstimate, vocabCount, kanjiCount, grammarPoints } = levelData;
  
  return (
    <div className="level-overview">
      <section className="overview-section">
        <h2>Thông tin khóa học {level}</h2>
        <div className="overview-stats">
          <div className="stat-card">
            <i className="fas fa-clock"></i>
            <h3>Thời gian học</h3>
            <p>{timeEstimate}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-book"></i>
            <h3>Số lượng từ vựng</h3>
            <p>{vocabCount} từ</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-language"></i>
            <h3>Số lượng Kanji</h3>
            <p>{kanjiCount} chữ</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-pen"></i>
            <h3>Điểm ngữ pháp</h3>
            <p>{grammarPoints} điểm</p>
          </div>
        </div>
      </section>

      <section className="roadmap-section">
        <h2>Lộ trình học gợi ý</h2>
        <div className="roadmap">
          {levelData.roadmap.map((item, index) => (
            <div className="roadmap-item" key={index}>
              <div className="roadmap-week">Tuần {index + 1}</div>
              <div className="roadmap-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="skills-section">
        <h2>Kỹ năng đạt được</h2>
        <ul className="skills-list">
          {levelData.skills.map((skill, index) => (
            <li key={index}>
              <i className="fas fa-check-circle"></i>
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="video-section">
        <h2>Video giới thiệu</h2>
        <div className="video-container">
          {/* Placeholder for video */}
          <div className="video-placeholder">
            <i className="fas fa-play-circle"></i>
            <p>Video giới thiệu về JLPT {level}</p>
          </div>
        </div>
      </section>

      <section className="exam-info">
        <h2>Thông tin kỳ thi JLPT {level}</h2>
        <div className="exam-details">
          <p><strong>Thời lượng:</strong> {levelData.examInfo.duration}</p>
          <p><strong>Cấu trúc:</strong> {levelData.examInfo.structure}</p>
          <p><strong>Điểm đỗ:</strong> {levelData.examInfo.passingScore}</p>
          <p>{levelData.examInfo.description}</p>
        </div>
        <Link to="/exam-info" className="btn btn-outline">Tìm hiểu thêm về kỳ thi JLPT</Link>
      </section>
    </div>
  );
};

export default LevelOverview;
