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

  const notCompleted = conversations.filter(
    (conv) => conv.action_status.completed !== conv.action_status.total
  );

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(notCompleted[0]);
  const [index, setSelectedIndex] = useState<number>(0);

  const onConversationSelect = (conv: Conversation, index: number) => {
    setSelectedConversation(conv);
    setSelectedIndex(index);
  };

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
          conversations={notCompleted}
          onConversationSelect={onConversationSelect}
        />
      )}
      {selectedConversation && (
        <Sidepage selectedConversation={selectedConversation} index={index} />
      )}
    </div>
  );
};

export default Main;
