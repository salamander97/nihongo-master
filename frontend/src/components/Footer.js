import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Nihongo Master</h4>
            <p>Nền tảng học tiếng Nhật thông minh với trợ lý AI.</p>
          </div>
          
          <div className="footer-section">
            <h4>Liên kết</h4>
            <ul className="footer-links">
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/courses">Khóa học</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Theo dõi</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; 2025 Nihongo Master. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
