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
              {slot.satisfaction !== null && (
                <p>Satisfaction: {slot.satisfaction}</p>
              )}
            </>
          ) : role === "student" && slot.coach ? (
            <>
              <p>Coach: {slot.coach.name}</p>
              {slot.studentId && (
                <button onClick={() => alert(`Phone: ${slot.coach.phone}`)}>
                  View Phone
                </button>
              )}
              {slot.satisfaction !== null && (
                <p>Satisfaction: {slot.satisfaction}</p>
              )}
              {!slot.studentId && (
                <button onClick={() => onBookSlot(slot.id)}>Book Slot</button>
              )}
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
