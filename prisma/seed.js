// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const coach = await prisma.user.create({
    data: {
      name: "John Doe",
      phone_number: "123-456-7890",
      role: "coach",
    },
  });

  const student = await prisma.user.create({
    data: {
      name: "Jane Doe",
      phone_number: "987-654-3210",
      role: "student",
    },
  });

  const slot = await prisma.slot.create({
    data: {
      coach_id: coach.id,
      start_time: new Date("2024-06-01T10:00:00.000Z"),
      end_time: new Date("2024-06-01T12:00:00.000Z"),
      booked: false,
    },
  });

  // Ensure this is done correctly. Here, we're using `slotId` to link to the existing slot.
  const appointment = await prisma.appointment.create({
    data: {
      slot_id: slot.id, // Link to the slot we just created
      student_id: student.id, // Link to the student we just created
      coach_notes: "Initial session, introduction.",
      student_satisfaction: 5,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
