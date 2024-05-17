import React, { useState } from "react";
import axios from "axios";

interface AddSlotFormProps {
  coachId: number;
  onSlotAdded: () => void;
}

const AddSlotForm: React.FC<AddSlotFormProps> = ({ coachId, onSlotAdded }) => {
  const [startTime, setStartTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/slots", { coachId, startTime });
      setStartTime("");
      onSlotAdded();
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Slot</h3>
      <div>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Add Slot</button>
    </form>
  );
};

export default AddSlotForm;
