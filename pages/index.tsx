import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Stepful Coaching</h1>
      <Link href="/coach">Coach View</Link>
      <br />
      <Link href="/student">Student View</Link>
    </div>
  );
};

export default Home;
