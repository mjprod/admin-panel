import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Sidepage from "./components/Sidepage";
import { Conversation, conversations } from "../util/ExampleData";

const Main = () => {

  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  
  return (
    <div className="main-container">
      <Sidebar conversations={conversations} onConversationSelect={setSelectedConversation}/>
      <Sidepage selectedConversation={selectedConversation}/>
    </div>
  );
};

export default Main;