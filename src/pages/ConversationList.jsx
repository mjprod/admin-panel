import React from "react";
import ConversationCard from "./ConversationCard";

const conversations = [
  { id: 1, category: "Technical", progress: "0/10", title: "Conversation 01", date: "15/2/2025", time: "12:24:01 pm", lang: "EN" },
  { id: 2, category: "Account", progress: "2/5", title: "Conversation 02", date: "14/2/2025", time: "10:30:00 am", lang: "MY" }
];

const ConversationList = () => {
  return (
    <div className="conversations-container">
      {conversations.map((conv) => (
        <ConversationCard key={conv.id} {...conv} />
      ))}
    </div>
  );
};

export default ConversationList;