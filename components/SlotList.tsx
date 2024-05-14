// components/SlotList.tsx
import React, { useEffect, useState } from "react";

interface Slot {
  id: number;
  coachId: number;
  startTime: string;
  endTime: string;
  booked: boolean;
}

const SlotList = () => {
  const [slots, setSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const res = await fetch("/api/slots");
      const data = await res.json();
      setSlots(data);
    };
    fetchSlots();
  }, []);

  return (
    <div>
      <h1>Available Slots</h1>
      <ul>
        {slots.map((slot) => (
          <li key={slot.id}>
            {slot.startTime} to {slot.endTime} -{" "}
            {slot.booked ? "Booked" : "Available"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlotList;
