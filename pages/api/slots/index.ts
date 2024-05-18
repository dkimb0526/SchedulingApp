import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { coachId, startTime } = req.body;
    try {
      const newSlot = await prisma.slot.create({
        data: {
          coachId: Number(coachId),
          startTime: new Date(startTime),
        },
      });
      res.status(201).json(newSlot);
    } catch (error) {
      console.error("Error creating slot:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
};
