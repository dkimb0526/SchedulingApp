import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentView from "../../components/StudentView";

const StudentPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>Loading...</p>;

  return <StudentView studentId={Number(id)} />;
};

export default StudentPage;
