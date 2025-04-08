import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="col-span-4 md-col-span-6 sm-col-span-12">
            <h4>Nihongo Master</h4>
            <p>Nền tảng học tiếng Nhật thông minh với trợ lý AI, giúp bạn học hiệu quả hơn.</p>
          </div>
          
          <div className="col-span-2 md-col-span-6 sm-col-span-12">
            <h4>Liên kết</h4>
            <ul className="footer-links">
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/courses">Khóa học</Link></li>
              <li><Link to="/community">Cộng đồng</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md-col-span-6 sm-col-span-12">
            <h4>Hỗ trợ</h4>
            <ul className="footer-links">
              <li><Link to="/guide">Hướng dẫn</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
            </ul>
          </div>
          
          <div className="col-span-4 md-col-span-6 sm-col-span-12">
            <h4>Theo dõi chúng tôi</h4>
            <div style={{ fontSize: '24px' }}>
              <a href="#" style={{ marginRight: '16px', color: 'white' }}><i className="fab fa-facebook"></i></a>
              <a href="#" style={{ marginRight: '16px', color: 'white' }}><i className="fab fa-youtube"></i></a>
              <a href="#" style={{ marginRight: '16px', color: 'white' }}><i className="fab fa-instagram"></i></a>
              <a href="#" style={{ color: 'white' }}><i className="fab fa-tiktok"></i></a>
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