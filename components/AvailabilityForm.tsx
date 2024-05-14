// components/AvailabilityForm.tsx
import React, { useState } from "react";

const AvailabilityForm = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/slots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coachId: 1, // Static for testing, dynamically assign in a real scenario
        startTime,
        endTime,
      }),
    });
    if (response.ok) {
      alert("Slot added successfully!");
      setStartTime("");
      setEndTime("");
    } else {
      alert("Failed to add slot");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="startTime">Start Time:</label>
      <input
        type="datetime-local"
        id="startTime"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <label htmlFor="endTime">End Time:</label>
      <input
        type="datetime-local"
        id="endTime"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
      />
      <button type="submit">Add Slot</button>
    </form>
  );
};

export default AvailabilityForm;
