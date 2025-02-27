import React from "react";
import Sidebar from "./components/Sidebar";
import Sidepage from "./components/Sidepage";

const Main = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <Sidepage />
    </div>
  );
};

export default Main;