// pages/index.tsx
import React, { useState } from "react";
import AvailabilityForm from "../components/AvailabilityForm";
import SlotList from "../components/SlotList";
import PastSessions from "../components/PastSessions";
import LoginSwitcher from "../components/LoginSwitcher";

const Home = () => {
  const [userType, setUserType] = useState("student"); // Default to student

  return (
    <div>
      <LoginSwitcher setUserType={setUserType} />
      {userType === "coach" ? (
        <>
          <AvailabilityForm />
          <PastSessions />
        </>
      ) : (
        <SlotList />
      )}
    </div>
  );
};

export default Home;
