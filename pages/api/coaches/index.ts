import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const coaches = await prisma.user.findMany({
      where: { role: "COACH" },
      include: { slots: true },
    });
    res.status(200).json(coaches);
  } else if (req.method === "POST") {
    const { name, phone } = req.body;
    const coach = await prisma.user.create({
      data: { name, phone, role: "COACH" },
    });
    res.status(201).json(coach);
  } else {
    res.status(405).end();
  }
};
