import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Học tiếng Nhật hiệu quả với trợ lý AI thông minh</h1>
            <p>Từ cơ bản đến nâng cao, luyện thi JLPT với lộ trình được cá nhân hóa</p>
            <Link to="/courses" className="btn btn-secondary btn-lg">Bắt đầu học ngay</Link>
          </div>
        </div>
      </section>
      
      {/* Các section khác của trang chủ */}
    </>
  );
};

export default HomePage;
