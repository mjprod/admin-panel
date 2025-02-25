import React from "react";
import Sidebar from "./Sidebar";
import ConversationDetails from "./ConversationDetails";

const Main = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <main>
        <ConversationDetails />
      </main>
    </div>
  );
};

export default Main;