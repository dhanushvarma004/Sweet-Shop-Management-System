import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {
  return (
    <Router>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    backgroundColor: "#ffb6c1",
    padding: "15px",
    borderRadius: "8px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#ff4081",
    padding: "8px 12px",
    borderRadius: "5px",
  },
};

export default App;
export {};
