import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-text">Nihongo Master</span>
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Trang chủ</Link>
          <Link to="/about" className="nav-link">Giới thiệu</Link>
          <Link to="/courses" className="nav-link">Khóa học</Link>
          <Link to="/community" className="nav-link">Cộng đồng</Link>
          <Link to="/login" className="nav-link btn btn-primary">Đăng nhập</Link>
        </nav>
        
        <button className="mobile-menu-btn">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
