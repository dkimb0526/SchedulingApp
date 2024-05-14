// pages/api/slots/index.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const slots = await prisma.slot.findMany({
      include: {
        coach: true,
        appointment: {
          include: {
            student: true,
          },
        },
      },
    });
    res.json(slots);
  } else if (req.method === "POST") {
    const { coach_id, start_time, end_time } = req.body;
    const newSlot = await prisma.slot.create({
      data: {
        coach_id,
        start_time,
        end_time,
      },
    });
    res.status(201).json(newSlot);
  }
}
