import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/api/placeholder/40/40" alt="Nihongo Master Logo" />
          <span className="logo-text">Nihongo Master</span>
        </Link>
        
        <nav className={`nav ${showMobileMenu ? 'show' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Trang chủ</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>Giới thiệu</Link>
          <Link to="/courses" className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}>Khóa học</Link>
          <Link to="/community" className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`}>Cộng đồng</Link>
          <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''} btn btn-primary`}>Đăng nhập</Link>
        </nav>
        
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;