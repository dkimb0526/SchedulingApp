import React, { useState } from "react";
import axios from "axios";

const AddSlotForm = ({ coachId }) => {
  const [startTime, setStartTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the startTime includes seconds and milliseconds
    const formattedStartTime = new Date(startTime).toISOString();

    try {
      await axios.post("/api/slots", {
        coachId,
        startTime: formattedStartTime,
      });
      alert("Slot created successfully!");
      setStartTime(""); // Clear the form after submission
    } catch (error) {
      console.error("Error creating slot:", error);
      alert("Failed to create slot.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Time:
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Slot</button>
    </form>
  );
};

export default AddSlotForm;
