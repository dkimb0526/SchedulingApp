import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const student = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          studentSlots: {
            include: {
              coach: true,
            },
          },
        },
      });

      const availableSlots = await prisma.slot.findMany({
        where: { studentId: null },
        include: {
          coach: true,
        },
      });

      if (student) {
        console.log("Fetched student data:", JSON.stringify(student, null, 2));
        console.log(
          "Fetched available slots:",
          JSON.stringify(availableSlots, null, 2)
        );
        res.status(200).json({ ...student, availableSlots });
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
};
