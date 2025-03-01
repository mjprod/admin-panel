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

  const notCompleted = conversationList.filter(
    (conv) => conv.review_status.length !== 3
  );

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(notCompleted[0]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversationList());
  }, [dispatch]);

  useEffect(() => {
    if (notCompleted.length > 0) {
      setConversation(notCompleted);
      if (selectedConversation) {
        const convs = notCompleted.find((con) => con.id === selectedConversation.id);

        if (convs) {
          setSelectedConversation(convs);
          return;
        }
      }

      setSelectedConversation(notCompleted[0]);
    }
  }, [conversationList]);

  return (
    <div className="main-container">
      {conversations.length > 0 && (
        <Sidebar
          conversations={notCompleted}
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
