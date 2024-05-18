import React, { useState } from "react";
import SlotList from "./SlotList";
import axios from "axios";

const CoachView = ({ coachData }) => {
  if (!coachData) {
    return <p>Loading...</p>;
  }

  const [startTime, setStartTime] = useState("");
  const [coachSlots, setCoachSlots] = useState(coachData.coachSlots);

  const upcomingSlots = coachSlots.filter(
    (slot) => slot.student && new Date(slot.startTime) > new Date()
  );
  const emptySlots = coachSlots.filter(
    (slot) => !slot.student && new Date(slot.startTime) > new Date()
  );

  const handleSelectSlot = (slot) => {
    console.log("Selected slot:", slot);
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/slots", {
        coachId: coachData.id,
        startTime,
      });
      setCoachSlots([...coachSlots, response.data]);
      setStartTime("");
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  };

  return (
    <div>
      <h2>{coachData.name}'s View</h2>
      <h3>Add New Slot</h3>
      <form onSubmit={handleAddSlot}>
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
      <h3>Upcoming Slots</h3>
      <SlotList
        slots={upcomingSlots}
        role="coach"
        onSelectSlot={handleSelectSlot}
      />
      <h3>Empty Slots</h3>
      <SlotList
        slots={emptySlots}
        role="coach"
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default CoachView;
