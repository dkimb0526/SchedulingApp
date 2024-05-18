Scheduling App
Overview
The Scheduling App is a full-stack application designed to streamline scheduling between coaches and students. Coaches can create available slots, provide feedback, and rate their sessions, while students can view and book these slots. The app supports real-time updates for a seamless user experience.

Features
Coach Functionality
Add Slots: Coaches can create new available slots.
View Upcoming Booked Slots: Coaches can see their upcoming sessions.
View Empty Slots: Coaches can view slots that are not yet booked.
Past Sessions: Coaches can view and edit notes and satisfaction ratings for past sessions.
Student Functionality
View Available Slots: Students can see and book slots that are available.
Book Slots: Students can book slots and view details of their upcoming sessions.
View Coach Details: After booking a session, students can view the coach's phone number.
Real-time Updates
Ensure that slot creation, booking, and updates are reflected in real-time across the app.
Technology Stack
Frontend: React, Next.js
Backend: Node.js, Express
Database: PostgreSQL, Prisma ORM
Setup and Installation
Prerequisites
Node.js (v14 or later)
PostgreSQL (v12 or later)
Installation Steps
Clone the repository:

sh
Copy code
git clone https://github.com/dkimb0526/scheduling-app.git
cd scheduling-app
Install dependencies:

sh
Copy code
npm install
Set up the database:

Create a PostgreSQL database.
Copy .env.example to .env and update the environment variables with your database credentials.
Run the Prisma migrations to set up the database schema:
sh
Copy code
npx prisma migrate dev --name init
Seed the database:

sh
Copy code
npx ts-node prisma/seed.ts
Run the development server:

sh
Copy code
npm run dev
The app should now be running on http://localhost:3000.

Project Structure
/components: React components used throughout the app.
/pages: Next.js pages for routing.
/pages/api: API routes for handling backend logic.
/prisma: Prisma schema and migration files.
/styles: None
API Endpoints
Coaches
GET /api/coaches: Retrieve a list of all coaches.
GET /api/coaches/[id]: Retrieve data for a specific coach.
POST /api/slots: Create a new slot for a coach.
PUT /api/slots/[id]: Update a slot with notes and satisfaction.
Students
GET /api/students: Retrieve a list of all students.
GET /api/students/[id]: Retrieve data for a specific student.
POST /api/slots/book: Book a slot for a student.
Usage
Coaches:

Navigate to the coach's page to view and manage slots.
Add new slots using the provided form.
View past sessions and edit notes and satisfaction ratings.
Students:

Navigate to the student's page to view available slots.
Book slots and see details of upcoming sessions.
After booking a session, view the coach's phone number.
