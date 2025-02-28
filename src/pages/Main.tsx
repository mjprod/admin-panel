import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Sidepage from "./components/Sidepage";
import { Conversation } from "../util/ExampleData";
import { useAppDispatch } from "../store/hooks";
import { getConversationList } from "../store/conversation.slice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Main = () => {
  const conversationList = useSelector(
    (state: RootState) => state.conversation.conversationList
  );
  const [conversations, setConversation] = useState<Conversation[]>(
    useSelector((state: RootState) => state.conversation.conversationList)
  );

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(conversations[0]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversationList());
  }, [dispatch]);

  useEffect(() => {
    if (conversationList.length > 0) {
      setConversation(conversationList);
      setSelectedConversation(conversationList[0]);
    }
  }, [conversationList]);

  return (
    <div className="main-container">
      {conversations.length > 0 && (
        <Sidebar
          conversations={conversations}
          onConversationSelect={setSelectedConversation}
        />
      )}
      {selectedConversation && (
        <Sidepage selectedConversation={selectedConversation} />
      )}
    </div>
  );
};

export default Main;
