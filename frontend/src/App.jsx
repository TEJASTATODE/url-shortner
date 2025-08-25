import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <nav
  style={{
   position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#2d3436",
    color: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  }}
>
  <div style={{ display: "flex", gap: "20px" }}>
    <Link
      to="/"
      style={{
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "500",
        transition: "color 0.3s",
      }}
      onMouseOver={(e) => (e.target.style.color = "#00cec9")}
      onMouseOut={(e) => (e.target.style.color = "#fff")}
    >
      Home
    </Link>

    <Link
      to="/admin"
      style={{
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "500",
        transition: "color 0.3s",
      }}
      onMouseOver={(e) => (e.target.style.color = "#00cec9")}
      onMouseOut={(e) => (e.target.style.color = "#fff")}
    >
      Admin
    </Link>
  </div>
</nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
