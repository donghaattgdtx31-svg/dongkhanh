// src/components/HeroSection.tsx
import React from "react";
import heroBg from "../assets/images/hero-bg.jpg"; // ảnh nền tĩnh

export const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      {/* Ảnh nền */}
      <img src={heroBg} alt="Hero Background" className="hero-bg" />

      {/* Nội dung trên Hero */}
      <div className="hero-content">
        <h1>Đạo quán Hoyoverse</h1>
        <p>Khám phá thế giới tuyệt vời như Genshin Impact</p>
        <button
          onClick={() => {
            // Chức năng tải game hoặc chuyển trang
            window.location.href = "/download";
          }}
        >
          Tải Ngay
        </button>
      </div>
    </section>
  );
};
