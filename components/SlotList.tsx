import React from "react";

interface Slot {
  id: number;
  startTime: string;
  coach?: { name: string };
  student?: { name: string };
  satisfaction?: number;
  notes?: string;
}

interface SlotListProps {
  slots: Slot[];
  onSelectSlot?: (slot: Slot) => void;
  onBookSlot?: (slotId: number) => void;
}

const SlotList: React.FC<SlotListProps> = ({
  slots,
  onSelectSlot,
  onBookSlot,
}) => {
  return (
    <div>
      <h3>Slots</h3>
      <ul>
        {slots.map((slot) => (
          <li key={slot.id}>
            {new Date(slot.startTime).toLocaleString()} with{" "}
            {slot.coach ? slot.coach.name : "Unknown Coach"}
            {slot.student && (
              <>
                <p>Booked by: {slot.student.name}</p>
                {slot.satisfaction && <p>Satisfaction: {slot.satisfaction}</p>}
                {slot.notes && <p>Notes: {slot.notes}</p>}
              </>
            )}
            {onBookSlot && !slot.student && (
              <button onClick={() => onBookSlot(slot.id)}>Book</button>
            )}
            {onSelectSlot && (
              <button onClick={() => onSelectSlot(slot)}>Details</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SlotList;
