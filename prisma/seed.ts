import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Coaches
  const coach1 = await prisma.user.create({
    data: {
      name: "Coach Alice",
      phone: "123-456-7890",
      role: "COACH",
    },
  });

  const coach2 = await prisma.user.create({
    data: {
      name: "Coach Bob",
      phone: "987-654-3210",
      role: "COACH",
    },
  });

  // Create Students
  const student1 = await prisma.user.create({
    data: {
      name: "Student Charlie",
      phone: "555-123-4567",
      role: "STUDENT",
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: "Student Dana",
      phone: "555-987-6543",
      role: "STUDENT",
    },
  });

  // Create Slots for Coach Alice
  await prisma.slot.createMany({
    data: [
      {
        coachId: coach1.id,
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        coachId: coach1.id,
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
      },
    ],
  });

  // Create Slots for Coach Bob
  await prisma.slot.createMany({
    data: [
      {
        coachId: coach2.id,
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
      },
      {
        coachId: coach2.id,
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      },
    ],
  });

  // Book a slot for Student Charlie with Coach Alice
  await prisma.slot.update({
    where: { id: 1 }, // Assuming the first slot created is the one we want to book
    data: { studentId: student1.id },
  });

  // Book a slot for Student Dana with Coach Bob
  await prisma.slot.update({
    where: { id: 3 }, // Assuming the third slot created is the one we want to book
    data: { studentId: student2.id },
  });

  // Record satisfaction and notes for a completed call
  await prisma.slot.update({
    where: { id: 1 },
    data: {
      satisfaction: 5,
      notes: "Excellent session. Charlie was very engaged.",
    },
  });

  console.log("Seed data created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
