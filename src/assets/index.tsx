import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// Nếu không dùng CSS thì xoá dòng này cũng được

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
