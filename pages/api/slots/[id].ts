import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { notes, satisfaction } = req.body;
    try {
      const updatedSlot = await prisma.slot.update({
        where: { id: Number(id) },
        data: { notes, satisfaction },
        include: { student: true, coach: true },
      });
      res.status(200).json(updatedSlot);
    } catch (error) {
      console.error("Error updating slot:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const slot = await prisma.slot.findUnique({
        where: { id: Number(id) },
        include: { student: true, coach: true },
      });

      if (slot) {
        res.status(200).json(slot);
      } else {
        res.status(404).json({ message: "Slot not found" });
      }
    } catch (error) {
      console.error("Error fetching slot data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
};
