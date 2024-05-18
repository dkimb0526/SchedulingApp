import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const slot = await prisma.slot.findUnique({
        where: { id: Number(id) },
        include: { coach: true, student: true },
      });
      if (slot) {
        res.status(200).json(slot);
      } else {
        res.status(404).json({ message: "Slot not found" });
      }
    } catch (error) {
      console.error("Error fetching slot:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    const { studentId } = req.body;

    try {
      console.log(`Booking slot ${id} for student ${studentId}`); // Add logging
      const slot = await prisma.slot.update({
        where: { id: Number(id) },
        data: { studentId: Number(studentId) },
        include: { coach: true, student: true }, // Include coach and student details in the response
      });
      console.log(`Slot booked successfully:`, slot); // Add logging
      res.status(200).json(slot);
    } catch (error) {
      console.error("Error booking slot:", error); // Add logging
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
};
