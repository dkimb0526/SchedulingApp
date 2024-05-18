import React from "react";

const SlotList = ({ slots, role, onSelectSlot, onBookSlot }) => {
  console.log("SlotList received slots:", slots); // Add logging

  if (!slots || slots.length === 0) {
    return <p>No slots available</p>;
  }

  return (
    <ul>
      {slots.map((slot) => (
        <li key={slot.id}>
          <p>Start Time: {new Date(slot.startTime).toLocaleString()}</p>
          {role === "coach" && slot.student ? (
            <>
              <p>Student: {slot.student.name}</p>
              <button onClick={() => alert(`Phone: ${slot.student.phone}`)}>
                View Phone
              </button>
              <button onClick={() => alert(`Notes: ${slot.notes}`)}>
                View Notes
              </button>
            </>
          ) : role === "student" && slot.coach ? (
            <>
              <p>Coach: {slot.coach.name}</p>
              <button onClick={() => onBookSlot(slot.id)}>Book Slot</button>
            </>
          ) : null}
          {onSelectSlot && (
            <button onClick={() => onSelectSlot(slot)}>View Details</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SlotList;
