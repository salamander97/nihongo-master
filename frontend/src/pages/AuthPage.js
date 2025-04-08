import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/styles.css';

const AuthPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const handleTabChange = (isLogin) => {
    setIsLoginActive(isLogin);
  };

  const handleFormToggle = (event) => {
    const target = event.target.getAttribute('data-target');
    if (target === 'login') {
      setIsLoginActive(true);
    } else if (target === 'register') {
      setIsLoginActive(false);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Xử lý đăng nhập
    console.log('Login submitted');
  };

  const handleRegister = (event) => {
    event.preventDefault();
    // Xử lý đăng ký
    console.log('Registration submitted');
  };

  return (
    <section className="auth-section">
      <div className="container">
        <div className="auth-container">
          {/* Auth Image */}
          <div className="auth-image">
            <div className="auth-image-content">
              <h2>Khám phá tiếng Nhật cùng Nihongo Master</h2>
              <p>Học tiếng Nhật hiệu quả với trợ lý AI thông minh, lộ trình cá nhân hóa và phương pháp học khoa học.</p>
              <p>Từ người mới bắt đầu đến nâng cao, chúng tôi có đầy đủ các khóa học từ N5 đến N1.</p>
            </div>
          </div>
          
          {/* Auth Form */}
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2>Chào mừng đến với Nihongo Master</h2>
            </div>
            
            <div className="auth-tabs">
              <div 
                className={`auth-tab ${isLoginActive ? 'active' : ''}`} 
                onClick={() => handleTabChange(true)}
              >
                Đăng nhập
              </div>
              <div 
                className={`auth-tab ${!isLoginActive ? 'active' : ''}`}
                onClick={() => handleTabChange(false)}
              >
                Đăng ký
              </div>
            </div>
            
            {/* Login Form */}
            <form 
              id="login-form" 
              className="auth-form" 
              style={{ display: isLoginActive ? 'block' : 'none' }}
              onSubmit={handleLogin}
            >
              <div className="form-group">
                <label htmlFor="login-email" className="form-label">Email</label>
                <input type="email" id="login-email" className="form-input" placeholder="Nhập email của bạn" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="login-password" className="form-label">Mật khẩu</label>
                <input type="password" id="login-password" className="form-input" placeholder="Nhập mật khẩu" required />
              </div>
              
              <div className="form-checkbox">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Ghi nhớ đăng nhập</label>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">Đăng nhập</button>
              
              <div className="auth-divider">
                <span>Hoặc đăng nhập với</span>
              </div>
              
              <div className="social-buttons">
                <Link to="#" className="btn-social btn-google">
                  <i className="fab fa-google"></i>
                  Google
                </Link>
                <Link to="#" className="btn-social btn-facebook">
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </Link>
              </div>
              
              <div className="auth-footer">
                <p>Quên mật khẩu? <Link to="/recover">Khôi phục</Link></p>
                <p>Chưa có tài khoản? <span className="toggle-form" data-target="register" onClick={handleFormToggle}>Đăng ký ngay</span></p>
              </div>
            </form>
            
            {/* Register Form */}
            <form 
              id="register-form" 
              className="auth-form" 
              style={{ display: !isLoginActive ? 'block' : 'none' }}
              onSubmit={handleRegister}
            >
              <div className="form-group">
                <label htmlFor="register-name" className="form-label">Họ và tên</label>
                <input type="text" id="register-name" className="form-input" placeholder="Nhập họ và tên của bạn" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="register-email" className="form-label">Email</label>
                <input type="email" id="register-email" className="form-input" placeholder="Nhập email của bạn" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="register-password" className="form-label">Mật khẩu</label>
                <input type="password" id="register-password" className="form-input" placeholder="Tạo mật khẩu (tối thiểu 8 ký tự)" required minLength="8" />
              </div>
              
              <div className="form-group">
                <label htmlFor="register-confirm-password" className="form-label">Xác nhận mật khẩu</label>
                <input type="password" id="register-confirm-password" className="form-input" placeholder="Nhập lại mật khẩu" required />
              </div>
              
              <div className="form-checkbox">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">Tôi đồng ý với <Link to="/terms">Điều khoản sử dụng</Link> và <Link to="/privacy">Chính sách bảo mật</Link></label>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
              
              <div className="auth-divider">
                <span>Hoặc đăng ký với</span>
              </div>
              
              <div className="social-buttons">
                <Link to="#" className="btn-social btn-google">
                  <i className="fab fa-google"></i>
                  Google
                </Link>
                <Link to="#" className="btn-social btn-facebook">
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </Link>
              </div>
              
              <div className="auth-footer">
                <p>Đã có tài khoản? <span className="toggle-form" data-target="login" onClick={handleFormToggle}>Đăng nhập</span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;