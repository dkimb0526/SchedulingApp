// components/AppointmentForm.tsx
import React, { useState } from "react";

const AppointmentForm = ({ slotId }) => {
  const [studentId, setStudentId] = useState(2); // Static for demo
  const handleAppointment = async () => {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId, studentId }),
    });
    if (response.ok) {
      alert("Appointment created successfully!");
    } else {
      alert("Failed to create appointment");
    }
  };

  return <button onClick={handleAppointment}>Book This Slot</button>;
};

export default AppointmentForm;
