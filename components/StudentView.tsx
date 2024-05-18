import React, { useState, useEffect } from "react";
import axios from "axios";
import SlotList from "./SlotList";

const StudentView = ({ studentId }) => {
  const [studentData, setStudentData] = useState(null);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`/api/students/${studentId}`);
      setStudentData(response.data);
      console.log("Student data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [studentId]);

  useEffect(() => {
    console.log("Updated studentData:", studentData);
  }, [studentData]);

  if (!studentData) return <p>Loading...</p>;

  const { studentSlots, availableSlots, name } = studentData;
  const upcomingSlots = studentSlots.filter(
    (slot) => new Date(slot.startTime) > new Date()
  );

  console.log("Available slots:", availableSlots);
  console.log("Upcoming slots:", upcomingSlots);

  const handleBookSlot = async (slotId) => {
    try {
      console.log(`Booking slot ${slotId} for student ${studentId}`);
      const response = await axios.post(`/api/slots/book`, {
        slotId,
        studentId,
      });
      console.log("Booking response:", response.data);
      fetchStudentData();
    } catch (error) {
      console.error("Error booking slot:", error);
    }
  };

  return (
    <div>
      <h2>{name} View</h2>
      <h3>Available Slots</h3>
      <SlotList
        slots={availableSlots}
        role="student"
        onBookSlot={handleBookSlot}
      />
      <h3>Your Upcoming Slots</h3>
      <SlotList slots={upcomingSlots} role="student" />
    </div>
  );
};

export default StudentView;
