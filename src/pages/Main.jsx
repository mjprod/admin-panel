import React from "react";
import Sidebar from "./components/Sidebar";
import Sidepage from "./components/Sidepage";
import { conversations } from "../util/ExampleData";

const Main = () => {
  const [selectedConversation, setSelectedConversation] = React.useState(conversations[0]);
  return (
    <div className="main-container">
      <Sidebar conversations={conversations} selectedConversation={selectedConversation}/>
      <Sidepage selectedConversation={selectedConversation}/>
    </div>
  );
};

export default Main;