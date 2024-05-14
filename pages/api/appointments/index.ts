// pages/api/appointments/index.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { slot_id, student_id } = req.body;
    const appointment = await prisma.appointment.create({
      data: {
        slot_id,
        student_id,
      },
    });
    await prisma.slot.update({
      where: { id: slot_id },
      data: { booked: true },
    });
    res.status(201).json(appointment);
  } else if (req.method === "GET") {
    const appointments = await prisma.appointment.findMany({
      include: {
        slot: true,
        student: true,
      },
    });
    res.json(appointments);
  }
}
