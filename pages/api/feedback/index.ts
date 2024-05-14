// pages/api/feedback/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Submit feedback
    const { bookingId, score, notes } = req.body;
    try {
      const feedback = await prisma.feedback.create({
        data: {
          bookingId,
          score,
          notes,
        },
      });
      res.status(201).json(feedback);
    } catch (error) {
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  } else if (req.method === "GET") {
    // Get all feedback
    try {
      const feedback = await prisma.feedback.findMany({
        include: {
          booking: {
            include: {
              slot: true,
              student: true,
            },
          },
        },
      });
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve feedback" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
