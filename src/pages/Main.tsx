import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Sidepage from "./components/Sidepage";
import { Conversation, conversations } from "../util/ExampleData";

const Main = () => {
  const notCompleted = conversations.filter(
    (conv) => conv.action_status.completed !== conv.action_status.total
  );

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(notCompleted[0]);
    const [index, setSelectedIndex] =
    useState<number>(0);

    const onConversationSelect = (conv: Conversation, index: number) => {
      setSelectedConversation(conv);
      setSelectedIndex(index);
    };

  return (
    <div className="main-container">
      <Sidebar
        conversations={notCompleted}
        onConversationSelect={onConversationSelect}
      />
      <Sidepage selectedConversation={selectedConversation} index={index}/>
    </div>
  );
};

export default Main;
