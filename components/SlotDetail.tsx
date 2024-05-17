import React, { useState } from "react";
import axios from "axios";

interface Slot {
  id: number;
  startTime: string;
  coach?: { name: string; phone: string };
  student?: { name: string; phone: string };
  satisfaction?: number;
  notes?: string;
}

interface SlotDetailProps {
  slot: Slot;
  onUpdateSlot: (updatedSlot: Slot) => void;
}

const SlotDetail: React.FC<SlotDetailProps> = ({ slot, onUpdateSlot }) => {
  const [satisfaction, setSatisfaction] = useState(slot.satisfaction || 0);
  const [notes, setNotes] = useState(slot.notes || "");

  const handleUpdateSlot = () => {
    axios
      .put(`/api/slots/${slot.id}`, { satisfaction, notes })
      .then((response) => onUpdateSlot(response.data));
  };

  return (
    <div>
      <h3>Slot Details</h3>
      <p>
        {new Date(slot.startTime).toLocaleString()} with{" "}
        {slot.coach ? slot.coach.name : "Unknown Coach"}
      </p>
      <p>
        Coach: {slot.coach ? slot.coach.name : "Unknown Coach"} (Phone:{" "}
        {slot.coach ? slot.coach.phone : "N/A"})
      </p>
      {slot.student && (
        <p>
          Student: {slot.student.name} (Phone: {slot.student.phone})
        </p>
      )}
      <div>
        <label>
          Satisfaction (1-5):
          <input
            type="number"
            value={satisfaction}
            min="1"
            max="5"
            onChange={(e) => setSatisfaction(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Notes:
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
      </div>
      <button onClick={handleUpdateSlot}>Update Slot</button>
    </div>
  );
};

export default SlotDetail;
