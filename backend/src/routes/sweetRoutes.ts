import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Get all sweets
router.get("/", async (req, res) => {
  try {
    const sweets = await prisma.sweet.findMany();
    res.json(sweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching sweets" });
  }
});

// ✅ Add a new sweet
router.post("/", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    // Simple validation
    if (!name || !price || !quantity) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newSweet = await prisma.sweet.create({
      data: {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      },
    });

    res.status(201).json(newSweet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding sweet" });
  }
});

export default router;
