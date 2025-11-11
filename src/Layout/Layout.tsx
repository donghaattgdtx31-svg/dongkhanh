// src/Layout/Layout.tsx
import React from "react";
import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "../assets/css/Layout.css";
import heroVideo from "../assets/videos/hero.mp4";

interface LayoutProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="layout">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <section className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video" src={heroVideo} />
        <div className="hero-overlay">
          <h1>Welcome to Đạo quán Hoyoverse</h1>
          <p>Khám phá thế giới tuyệt vời như Genshin Impact</p>
        </div>
      </section>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">&copy; 2025 Đạo quán Hoyoverse</footer>
    </div>
  );
};

export default Layout;
