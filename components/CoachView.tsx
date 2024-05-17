import React, { useState, useEffect } from "react";
import axios from "axios";
import SlotList from "./SlotList";
import SlotDetail from "./SlotDetail";

const CoachView = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    axios
      .get("/api/coaches/1")
      .then((response) => setSlots(response.data.slots));
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
      <SlotList slots={slots} onSelectSlot={handleSelectSlot} />
      {selectedSlot && (
        <SlotDetail slot={selectedSlot} onUpdateSlot={handleUpdateSlot} />
      )}
    </div>
  );
};

export default CoachView;
