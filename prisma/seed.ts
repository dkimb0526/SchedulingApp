const { PrismaClient } = require("@prisma/client");

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

  // Create Future Slots for Coach Alice and assign to Student Charlie
  await prisma.slot.create({
    data: {
      coachId: coach1.id,
      studentId: student1.id, // Assign to Student Charlie
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      satisfaction: null,
      notes: null,
    },
  });

  await prisma.slot.create({
    data: {
      coachId: coach1.id,
      studentId: student2.id, // Assign to Student Dana
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
      satisfaction: null,
      notes: null,
    },
  });

  // Create Future Slots for Coach Bob
  await prisma.slot.create({
    data: {
      coachId: coach2.id,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
      satisfaction: null,
      notes: null,
    },
  });

  await prisma.slot.create({
    data: {
      coachId: coach2.id,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      satisfaction: null,
      notes: null,
    },
  });

  // Create Past Slots for Coach Alice and Student Charlie
  await prisma.slot.create({
    data: {
      coachId: coach1.id,
      studentId: student1.id, // Assign to Student Charlie
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      satisfaction: 5,
      notes: "Excellent session. Charlie was very engaged.",
    },
  });

  await prisma.slot.create({
    data: {
      coachId: coach1.id,
      studentId: student2.id, // Assign to Student Dana
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      satisfaction: 4,
      notes: "Good session. Dana needs to work on her timing.",
    },
  });

  // Log created data
  const allSlots = await prisma.slot.findMany({
    include: {
      coach: true,
      student: true,
    },
  });
  console.log("All slots:", allSlots);

  const allUsers = await prisma.user.findMany({
    include: {
      coachSlots: true,
      studentSlots: true,
    },
  });
  console.log("All users with slots:", allUsers);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
