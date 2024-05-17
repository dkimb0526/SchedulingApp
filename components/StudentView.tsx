import React, { useState, useEffect } from "react";
import axios from "axios";
import SlotList from "./SlotList";

const StudentView = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get("/api/slots").then((response) => setSlots(response.data));
  }, []);

  const handleBookSlot = (slotId) => {
    axios.put(`/api/slots/${slotId}`, { studentId: 1 }).then((response) => {
      setSlots((prevSlots) =>
        prevSlots.map((slot) => (slot.id === slotId ? response.data : slot))
      );
    });
  };

  return (
    <div>
      <h2>Student View</h2>
      <SlotList slots={slots} onBookSlot={handleBookSlot} />
    </div>
  );
};

export default StudentView;
