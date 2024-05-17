/*
  Warnings:

  - You are about to drop the column `booked` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `coach_id` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coachId` to the `Slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COACH', 'STUDENT');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_slot_id_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_coach_id_fkey";

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "booked",
DROP COLUMN "coach_id",
DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "coachId" INTEGER NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "satisfaction" INTEGER,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "studentId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone_number",
ADD COLUMN     "phone" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "Appointment";

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
