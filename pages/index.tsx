import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await axios.get("/api/students");
        setStudents(studentsResponse.data);
        const coachesResponse = await axios.get("/api/coaches");
        setCoaches(coachesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <Link href={`/students/${student.id}`}>{student.name}</Link>
          </li>
        ))}
      </ul>
      <h2>Coaches</h2>
      <ul>
        {coaches.map((coach) => (
          <li key={coach.id}>
            <Link href={`/coaches/${coach.id}`}>{coach.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
