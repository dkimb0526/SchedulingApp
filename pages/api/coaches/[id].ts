import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const coach = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { slots: true },
      });
      if (coach) {
        res.status(200).json(coach);
      } else {
        res.status(404).json({ message: "Coach not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    const { name, phone } = req.body;

    try {
      const updatedCoach = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, phone },
      });
      res.status(200).json(updatedCoach);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
};
