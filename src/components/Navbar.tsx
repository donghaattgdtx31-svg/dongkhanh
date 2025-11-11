import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getUserProfile, logoutUser } from "../supabase/authClient";
import "./Navbar.css";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  const [profile, setProfile] = useState<{
    username: string;
    email: string;
    avatar_url?: string;
  } | null>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const userWrapperRef = useRef<HTMLDivElement>(null);

  // Lấy profile khi login
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const data = await getUserProfile();
        if (data) {
          setProfile({
            username: data.username,
            email: data.email,
            avatar_url: data.avatar_url,
          });
        }
      })();
    } else {
      setProfile(null);
      setShowDropdown(false);
    }
  }, [isLoggedIn]);

  // Click ngoài dropdown sẽ đóng
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userWrapperRef.current &&
        !userWrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    onLogout();
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img
          src="https://i.pinimg.com/736x/b6/13/f9/b613f96d539eb174ffbc1fdb130be012.jpg"
          alt="Logo"
          className="logo"
        />
        <span className="logo-text">Đạo quán Hoyoverse</span>
      </div>

      {/* Scrollable menu + user */}
      <div className="nav-center-wrapper">
        <ul className="nav-center menu">
          <li><Link to="/">Trang Chủ</Link></li>
          <li><Link to="/buon-hang">Buôn nhân vật</Link></li>
          <li>
            <a
              href="https://www.facebook.com/groups/genshin.vi/?locale=vi_VN"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cộng Đồng
            </a>
          </li>
          <li>
            <a
              href="https://genshin.hoyoverse.com/vi/news"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tin tức
            </a>
          </li>
          <li><Link to="/cart">Giỏ hàng ({cartCount})</Link></li>

          {/* User / Login */}
          <div className="user-menu-wrapper" ref={userWrapperRef}>
            {isLoggedIn && profile ? (
              <>
                <img
                  src={profile.avatar_url || "https://i.pravatar.cc/40"}
                  alt="User avatar"
                  className="user-avatar"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="user-dropdown">
                    <p><strong>{profile.username}</strong></p>
                    <p>{profile.email}</p>
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="login-link">Login</Link>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};
