// components/FeedbackForm.tsx
import React, { useState } from "react";

interface Props {
  bookingId: number;
}

const FeedbackForm = ({ bookingId }: Props) => {
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId, score, notes }),
    });
    if (response.ok) {
      alert("Feedback submitted successfully!");
      setScore(0);
      setNotes("");
    } else {
      alert("Failed to submit feedback");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="score">Score (1-5):</label>
      <input
        type="number"
        id="score"
        value={score}
        min="1"
        max="5"
        onChange={(e) => setScore(parseInt(e.target.value))}
        required
      />
      <label htmlFor="notes">Notes:</label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        required
      />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
