import React from "react";
import CreateNewButton from "./newManager/components/sideBar/createNewButton/CreateNewButton";
import ChatHistoryButton from "./newManager/components/sideMain/questionList/components/chatHistoryButton/ChatHistoryButton";
import { ChatType, MessageType } from "../components/popUp/popUpChatHistory/ChatDialog";

const TestPage = () => {

  const context = {
    conversationId: "12tgvbhhgbhnj",
    date_time: "09/09/2029",
    chat_data: [
      {
        id: 123,
        type: ChatType.CustomerSupport,
        datetime: "09/09/2029",
        message: "wertyhbvfgyhujkl asd sdas",
        isActive: false,
      },
      {
        id: 123,
        type: ChatType.User,
        datetime: "09/09/2029",
        message: "wertyhbvfgyhujkl",
        isActive: false,
      },
      {
        id: 123,
        type: ChatType.JokerBot,
        datetime: "09/09/2029",
        message: "wert yhbvf gyhujkl",
        isActive: false,
        messageType: MessageType.Good
      },
      {
        id: 123,
        type: ChatType.JokerBot,
        datetime: "09/09/2029",
        message: "wert yhb vfg yh ujkl",
        isActive: true,
        messageType: MessageType.Changed
      },
      {
        id: 123,
        type: ChatType.JokerBot,
        datetime: "09/09/2029",
        message: "wert yhb vfg yh ujkl",
        isActive: true,
        messageType: MessageType.Bad
      },
    ],
  };
  
  return (
    <div>
      <CreateNewButton />
      {/* <MaxCard /> */}
      <ChatHistoryButton conversationData={context} />
    </div>
  );
};

export default TestPage;
