const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function resetDatabase() {
  await prisma.slot.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Database reset successfully.");
}

resetDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
