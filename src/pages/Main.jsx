import React from "react";
import Sidebar from "./components/Sidebar";
import Sidepage from "./components/Sidepage";
import { conversations } from "../util/ExampleData";

const Main = () => {
  
  const onConversationSelect = (conversationId) => {
    console.log("Selected conversation: ", conversationId);
  };
  
  return (
    <div className="main-container">
      <Sidebar conversations={conversations} onConversationSelect={onConversationSelect}/>
      <Sidepage />
    </div>
  );
};

export default Main;