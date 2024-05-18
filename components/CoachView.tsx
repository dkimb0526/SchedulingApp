import React, { useState } from "react";
import SlotList from "./SlotList";
import axios from "axios";

const CoachView = ({ coachData }) => {
  if (!coachData) {
    return <p>Loading...</p>;
  }

  const [startTime, setStartTime] = useState("");
  const [coachSlots, setCoachSlots] = useState(coachData.coachSlots);
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [notes, setNotes] = useState("");
  const [satisfaction, setSatisfaction] = useState(null);

  const upcomingSlots = coachSlots.filter(
    (slot) => slot.student && new Date(slot.startTime) > new Date()
  );
  const emptySlots = coachSlots.filter(
    (slot) => !slot.student && new Date(slot.startTime) > new Date()
  );
  const pastSlots = coachSlots.filter(
    (slot) => new Date(slot.startTime) < new Date()
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

  const handleEditSlot = (slot) => {
    setEditingSlotId(slot.id);
    setNotes(slot.notes || "");
    setSatisfaction(slot.satisfaction || "");
  };

  const handleSaveSlot = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/slots/${editingSlotId}`, {
        notes,
        satisfaction: parseInt(satisfaction),
      });
      setCoachSlots(
        coachSlots.map((slot) =>
          slot.id === editingSlotId ? response.data : slot
        )
      );
      setEditingSlotId(null);
      setNotes("");
      setSatisfaction("");
    } catch (error) {
      console.error("Error saving slot:", error);
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
      <h3>Past Sessions</h3>
      <ul>
        {pastSlots.map((slot) => (
          <li key={slot.id}>
            <p>Start Time: {new Date(slot.startTime).toLocaleString()}</p>
            <p>Student: {slot.student ? slot.student.name : "N/A"}</p>
            <p>Satisfaction: {slot.satisfaction}</p>
            <p>Notes: {slot.notes}</p>
            <button onClick={() => handleEditSlot(slot)}>Edit</button>
            {editingSlotId === slot.id && (
              <form onSubmit={handleSaveSlot} style={{ display: "inline" }}>
                <label>
                  Notes:
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Satisfaction:
                  <input
                    type="number"
                    value={satisfaction}
                    onChange={(e) => setSatisfaction(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingSlotId(null)}>
                  Cancel
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoachView;
