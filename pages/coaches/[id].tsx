import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CoachView from "../../components/CoachView";

const CoachPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [coachData, setCoachData] = useState(null);

  useEffect(() => {
    const fetchCoachData = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/coaches/${id}`);
        setCoachData(response.data);
        console.log("Coach data fetched:", response.data); // Add logging
      } catch (error) {
        console.error("Error fetching coach data:", error);
      }
    };

    fetchCoachData();
  }, [id]);

  if (!coachData) return <p>Loading...</p>;

  return <CoachView coachData={coachData} />;
};

export default CoachPage;
