import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const slots = await prisma.slot.findMany({
        include: {
          coach: true,
          student: true,
        },
      });
      res.status(200).json(slots);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    const { coachId, startTime } = req.body;
    try {
      const slot = await prisma.slot.create({
        data: { coachId, startTime },
      });
      res.status(201).json(slot);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
};
