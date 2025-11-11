// src/pages/Homepage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css"; // tạo file CSS riêng để style

const Homepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Video nền */}
      <div className="hero-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          src="https://genshin.mihoyo.com/_nuxt/videos/3e78e80.mp4"
        />
        <div className="hero-overlay">
          <h1>Chào mừng đến Đạo quán Hoyoverse</h1>
          <p>Khám phá thế giới tuyệt vời như Genshin Impact</p>
          <div className="hero-buttons">
            <button onClick={() => navigate("/login")} className="btn-login">
              Đăng nhập
            </button>
            <a
              href="https://genshin.hoyoverse.com/vi/home"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-website"
            >
              Trang chủ Genshin Impact
            </a>
          </div>
        </div>
      </div>

      {/* Giới thiệu ngắn */}
      <section className="intro-section">
        <h2>Thế giới Genshin trong tay bạn</h2>
        <p>
          Tìm hiểu nhân vật, buôn bán và trải nghiệm mọi thứ như một game thủ
          thực thụ. Hãy bắt đầu cuộc phiêu lưu ngay hôm nay!
        </p>
      </section>
    </div>
  );
};

export default Homepage;
