import React from "react";
import Upcoming from "./Movies/Upcoming.jsx";
import Popular from "./Movies/Popular.jsx";
import TopRated from "./Movies/TopRated.jsx";

const Home = () => {
  return (
    <div className="col-lg-8">
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
