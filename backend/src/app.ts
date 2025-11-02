import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import sweetRoutes from "./routes/sweetRoutes"; // ✅ import sweets route

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes); // ✅ connect sweets route here

export default app;
