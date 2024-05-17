import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const students = await prisma.user.findMany({
        where: { role: "STUDENT" },
        include: { bookings: true },
      });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "POST") {
    const { name, phone } = req.body;
    try {
      const student = await prisma.user.create({
        data: { name, phone, role: "STUDENT" },
      });
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
};
