import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === "GET") {
    const slot = await prisma.slot.findUnique({
      where: { id: Number(id) },
      include: { coach: true, student: true },
    });
    res.status(200).json(slot);
  } else if (req.method === "PUT") {
    const { studentId, satisfaction, notes } = req.body;
    const slot = await prisma.slot.update({
      where: { id: Number(id) },
      data: { studentId, satisfaction, notes },
    });
    res.status(200).json(slot);
  } else {
    res.status(405).end();
  }
};
