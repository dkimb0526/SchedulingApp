// components/PastSessions.tsx
import React, { useEffect, useState } from "react";

const PastSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setSessions(data);
    };
    fetchFeedback();
  }, []);

  return (
    <div>
      <h1>Past Sessions</h1>
      {sessions.map((session) => (
        <div key={session.id}>
          <p>Score: {session.score}</p>
          <p>Notes: {session.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default PastSessions;
