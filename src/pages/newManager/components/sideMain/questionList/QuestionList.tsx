import React from "react";
import styles from "./QuestionList.module.css";
import QuestionCard from "./components/questionCard/QuestionCard";
import { useConversationsContext } from "../../../../../context/ConversationProvider";

interface QuestionListProps {}

const QuestionList: React.FC<QuestionListProps> = ({ }) => {

   const {
      conversations,
      setConversations,
    } = useConversationsContext();

    const handleConversationSelected = (
      conversationId: string,
      checked: boolean
    ) => {
      const convo = conversations.find(
        (conv) => conv.conversationId === conversationId
      );
      if (convo) {
        convo.isSelected = checked;
        setConversations([...conversations]);
      }
    };
  return (
    <div className={styles["question-group-scroll-container"]}>
      {conversations.map((con, index) => (
        <QuestionCard
          key={index + con.conversationId}
          {...con}
          onSelected={handleConversationSelected}
        />
      ))}
    </div>
  );
};

export default QuestionList;