import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { slotId, studentId } = req.body;

    try {
      console.log(`Booking slot ${slotId} for student ${studentId}`); // Add logging
      const slot = await prisma.slot.update({
        where: { id: Number(slotId) },
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
