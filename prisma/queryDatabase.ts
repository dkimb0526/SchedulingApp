const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Fetch all users and their associated slots
  const allUsers = await prisma.user.findMany({
    include: {
      slots: {
        include: {
          coach: true,
          student: true,
        },
      },
    },
  });

  // Fetch all slots and their associated coaches and students
  const allSlots = await prisma.slot.findMany({
    include: {
      coach: true,
      student: true,
    },
  });

  console.log("All users:", JSON.stringify(allUsers, null, 2));
  console.log("All slots:", JSON.stringify(allSlots, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
