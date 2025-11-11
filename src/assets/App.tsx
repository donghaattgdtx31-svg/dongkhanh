// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import CharacterList from "./pages/CharacterList";
import CartPage from "./pages/CartPage";
import MainPage from "./pages/MainPages";
import LoginPages from "./pages/LoginPages";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("user")
  );

  const handleLoginSuccess = () => {
    localStorage.setItem("user", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Layout onLogout={handleLogout} isLoggedIn={isLoggedIn} />}
          >
            <Route index element={<MainPage />} />
            <Route
              path="buon-hang"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CharacterList />
                </ProtectedRoute>
              }
            />
            <Route
              path="cart"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={
                isLoggedIn ? <Navigate to="/" replace /> : <LoginPages onLoginSuccess={handleLoginSuccess} />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}
