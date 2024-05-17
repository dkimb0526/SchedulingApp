import React, { useState, useEffect } from "react";
import axios from "axios";
import SlotList from "../components/SlotList";
import SlotDetail from "../components/SlotDetail";
import AddSlotForm from "../components/AddSlotForm";

const CoachView = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const coachId = 1; // Assuming the coach is logged in and has ID 1

  const fetchSlots = () => {
    axios.get("/api/slots").then((response) => {
      setSlots(response.data);
    });
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const handleUpdateSlot = (updatedSlot) => {
    setSlots((prevSlots) =>
      prevSlots.map((slot) => (slot.id === updatedSlot.id ? updatedSlot : slot))
    );
    setSelectedSlot(updatedSlot);
  };

  return (
    <div>
      <h2>Coach View</h2>
      <AddSlotForm coachId={coachId} onSlotAdded={fetchSlots} />
      <SlotList slots={slots} onSelectSlot={handleSelectSlot} />
      {selectedSlot && (
        <SlotDetail slot={selectedSlot} onUpdateSlot={handleUpdateSlot} />
      )}
    </div>
  );
};

export default CoachView;
