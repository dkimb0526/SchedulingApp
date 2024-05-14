-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "booked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "slot_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "coach_notes" TEXT,
    "student_satisfaction" INTEGER,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_slot_id_key" ON "Appointment"("slot_id");

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
