import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  if (req.method === "GET") {
    const student = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { bookings: true },
    });
    res.status(200).json(student);
  } else {
    res.status(405).end();
  }
};
