import React, { useState } from "react";
import api from "../api";

const Register: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      setMessage("Registration successful! Please login.");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
        <p style={styles.linkText}>
          Already have an account?{" "}
          <a href="/login" style={styles.link}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f8b500, #fceabb)",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "15px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    fontWeight: "bold",
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
    fontSize: "14px",
    transition: "0.3s",
  },
  button: {
    background: "linear-gradient(90deg, #f093fb, #f5576c)",
    border: "none",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  buttonHover: {
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  message: {
    marginTop: "10px",
    color: "#333",
  },
  linkText: {
    marginTop: "10px",
    fontSize: "14px",
  },
  link: {
    color: "#f5576c",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Register;
export {};
