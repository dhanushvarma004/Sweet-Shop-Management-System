import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a new sweet
export const addSweet = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const sweet = await prisma.sweet.create({
      data: { name, description, price, imageUrl },
    });
    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ error: "Failed to add sweet" });
  }
};

// Get all sweets
export const getSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await prisma.sweet.findMany();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sweets" });
  }
};

// Update a sweet
export const updateSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl } = req.body;
    const sweet = await prisma.sweet.update({
      where: { id: Number(id) },
      data: { name, description, price, imageUrl },
    });
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ error: "Failed to update sweet" });
  }
};

// Delete a sweet
export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.sweet.delete({ where: { id: Number(id) } });
    res.json({ message: "Sweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete sweet" });
  }
};
