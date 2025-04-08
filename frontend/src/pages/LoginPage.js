import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="auth-section">
      <div className="container">
        <div className="auth-container">
          <div className="auth-image">
            <div className="auth-image-content">
              <h2>Khám phá tiếng Nhật cùng Nihongo Master</h2>
              <p>Học tiếng Nhật hiệu quả với trợ lý AI thông minh.</p>
            </div>
          </div>
          
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2>Chào mừng đến với Nihongo Master</h2>
            </div>
            
            <div className="auth-tabs">
              <div 
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Đăng nhập
              </div>
              <div 
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Đăng ký
              </div>
            </div>
            
            {isLogin ? (
              <form className="auth-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" id="email" className="form-input" placeholder="Nhập email của bạn" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Mật khẩu</label>
                  <input type="password" id="password" className="form-input" placeholder="Nhập mật khẩu" />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
              </form>
            ) : (
              <form className="auth-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Họ tên</label>
                  <input type="text" id="name" className="form-input" placeholder="Nhập họ tên của bạn" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="register-email" className="form-label">Email</label>
                  <input type="email" id="register-email" className="form-input" placeholder="Nhập email của bạn" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="register-password" className="form-label">Mật khẩu</label>
                  <input type="password" id="register-password" className="form-input" placeholder="Tạo mật khẩu" />
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
