import React, { useState } from "react";
import api from "../api";

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Login successful!");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "❌ Invalid credentials");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🍬 Sweet Shop Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #ffb6c1, #ff69b4)",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#ff4081",
    fontSize: "1.8rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "1rem",
    transition: "0.3s",
  },
  button: {
    padding: "12px",
    backgroundColor: "#ff4081",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
  },
  message: {
    marginTop: "15px",
    color: "#333",
    fontWeight: 500,
  },
};



export default Login;
export {};
