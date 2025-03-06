import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Sidepage from "./components/sidepage/Sidepage";
import { Conversation } from "../../util/ExampleData";
import { useAppDispatch } from "../../store/hooks";
import { getConversationList } from "../../store/conversation.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Manager.module.css";

const Manager = () => {
  const conversationList = useSelector(
    (state: RootState) => state.conversation.conversationList
  );

  const [conversations, setConversation] = useState<Conversation[]>(conversationList);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>(conversationList[0]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversationList());
  }, [dispatch]);

  useEffect(() => {
    console.log("conversation update", conversationList)
    const notCompleted = conversationList.filter(
      (conv) => conv.review_status.length !== 3
    );
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
    <div className={styles["main-container"]}>
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

export default Manager;
