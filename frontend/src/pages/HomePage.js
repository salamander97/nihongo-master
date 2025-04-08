import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/styles.css';
import initLevelSlider from '../utils/levelSlider';

const HomePage = () => {

  useEffect(() => {
    // Khởi tạo slider khi component được mount
    const cleanup = initLevelSlider();
    
    // Cleanup khi component unmount
    return cleanup;
  }, []);
  
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Học tiếng Nhật hiệu quả với trợ lý AI thông minh</h1>
            <p>Từ cơ bản đến nâng cao, luyện thi JLPT với lộ trình được cá nhân hóa</p>
            <Link to="/register" className="btn btn-secondary btn-lg">Bắt đầu học ngay</Link>
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center">Các cấp độ học tập</h2>
          <p className="text-center">Lộ trình học từ N5 đến N1 theo chuẩn JLPT</p>

          <div className="levels-slider-container">
            <button className="slider-arrow slider-prev">
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="levels-slider" id="levelsSlider">
              <div className="levels-track">
                <div className="level-card-container">
                  <div className="card level-card">
                    <div className="card-body">
                      <span className="level-badge">N5</span>
                      <h3 className="level-title">Sơ cấp</h3>
                      <p className="level-subtitle">Dành cho người mới bắt đầu</p>
                      <p className="card-text">Làm quen với bảng chữ cái, từ vựng và ngữ pháp cơ bản trong giao tiếp hàng ngày.</p>
                      <Link to="/courses/n5" className="btn btn-outline">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>

                <div className="level-card-container">
                  <div className="card level-card">
                    <div className="card-body">
                      <span className="level-badge">N4</span>
                      <h3 className="level-title">Sơ trung cấp</h3>
                      <p className="level-subtitle">Củng cố kiến thức</p>
                      <p className="card-text">Mở rộng vốn từ và cấu trúc ngữ pháp, nâng cao khả năng giao tiếp cơ bản.</p>
                      <Link to="/courses/n4" className="btn btn-outline">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>

                <div className="level-card-container">
                  <div className="card level-card">
                    <div className="card-body">
                      <span className="level-badge">N3</span>
                      <h3 className="level-title">Trung cấp</h3>
                      <p className="level-subtitle">Tiến lên chuyên sâu</p>
                      <p className="card-text">Hiểu và sử dụng tiếng Nhật trong nhiều tình huống giao tiếp khác nhau.</p>
                      <Link to="/courses/n3" className="btn btn-outline">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>

                <div className="level-card-container">
                  <div className="card level-card">
                    <div className="card-body">
                      <span className="level-badge">N2</span>
                      <h3 className="level-title">Cao cấp</h3>
                      <p className="level-subtitle">Nâng cao kỹ năng</p>
                      <p className="card-text">Sử dụng tiếng Nhật thành thạo trong công việc và cuộc sống hàng ngày.</p>
                      <Link to="/courses/n2" className="btn btn-outline">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>

                <div className="level-card-container">
                  <div className="card level-card">
                    <div className="card-body">
                      <span className="level-badge">N1</span>
                      <h3 className="level-title">Chuyên gia</h3>
                      <p className="level-subtitle">Thành thạo tiếng Nhật</p>
                      <p className="card-text">Sử dụng tiếng Nhật trong các tình huống phức tạp và chuyên sâu.</p>
                      <Link to="/courses/n1" className="btn btn-outline">Xem chi tiết</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="slider-arrow slider-next">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <h2 className="text-center">Tính năng nổi bật</h2>
          <p className="text-center">Những tính năng giúp bạn học tiếng Nhật hiệu quả hơn</p>

          <div className="grid">
            <div className="col-span-4 md-col-span-6 sm-col-span-12">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <h3>AI Assistant</h3>
                <p>Trợ lý AI thông minh giúp bạn học tiếng Nhật hiệu quả hơn với những câu hỏi và lời giải thích phù hợp.</p>
              </div>
            </div>

            <div className="col-span-4 md-col-span-6 sm-col-span-12">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <h3>Lộ trình cá nhân hóa</h3>
                <p>Hệ thống đề xuất bài học và ôn tập dựa trên trình độ và tiến độ học tập của bạn.</p>
              </div>
            </div>

            <div className="col-span-4 md-col-span-6 sm-col-span-12">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h3>Ôn tập thông minh</h3>
                <p>Hệ thống ôn tập ngắt quãng (Spaced Repetition) giúp bạn ghi nhớ từ vựng và ngữ pháp lâu dài.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="text-center">Phản hồi từ học viên</h2>
          <p className="text-center">Những chia sẻ từ người học tiếng Nhật với Nihongo Master</p>

          <div className="grid">
            <div className="col-span-6 md-col-span-12">
              <div className="testimonial">
                <p className="testimonial-text">"Tôi đã học tiếng Nhật được 6 tháng với Nihongo Master. Trợ lý AI thực sự hữu ích khi giải đáp mọi thắc mắc của tôi về ngữ pháp và từ vựng."</p>
                <div className="testimonial-author">
                  <img src="/api/placeholder/50/50" alt="Avatar" className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">Nguyễn Văn A</div>
                    <div>Học viên N4</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-6 md-col-span-12">
              <div className="testimonial">
                <p className="testimonial-text">"Hệ thống ôn tập thông minh giúp tôi nhớ từ vựng tiếng Nhật lâu hơn. Thiết kế bài học rất khoa học và dễ tiếp cận."</p>
                <div className="testimonial-author">
                  <img src="/api/placeholder/50/50" alt="Avatar" className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">Trần Thị B</div>
                    <div>Học viên N3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2>Sẵn sàng bắt đầu hành trình học tiếng Nhật?</h2>
          <p>Đăng ký tài khoản miễn phí và bắt đầu học ngay hôm nay</p>
          <Link to="/register" className="btn btn-secondary btn-lg">Đăng ký ngay</Link>
        </div>
      </section>

      {/* AI Chat Button */}
      <div className="chat-btn">
        <i className="fas fa-comment-dots"></i>
      </div>
    </>
  );
};

export default HomePage;