// components/LoginSwitcher.tsx
import React, { useState } from "react";

const LoginSwitcher = ({
  setUserType,
}: {
  setUserType: (type: string) => void;
}) => {
  return (
    <div>
      <button onClick={() => setUserType("coach")}>Switch to Coach View</button>
      <button onClick={() => setUserType("student")}>
        Switch to Student View
      </button>
    </div>
  );
};

export default LoginSwitcher;
