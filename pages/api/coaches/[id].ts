import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const coach = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          coachSlots: {
            include: {
              student: true,
            },
          },
        },
      });

      if (coach) {
        console.log("Fetched coach data:", JSON.stringify(coach, null, 2));
        res.status(200).json(coach);
      } else {
        res.status(404).json({ message: "Coach not found" });
      }
    } catch (error) {
      console.error("Error fetching coach data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end();
  }
};
