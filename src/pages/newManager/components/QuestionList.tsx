import React from "react";
import QuestionCard from "./QuestionCard";
import styles from "../NewManager.module.css";
import { KnowledgeCard } from "../../../api/responsePayload/KnowledgeResponse";

interface QuestionListProps {
  conversations: KnowledgeCard[];
  onSelected: (
    conversationId: string,
    checked: boolean
  ) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ conversations, onSelected }) => {
  return (
    <div className={styles["question-group-scroll-container"]}>
      {conversations.map((con, index) => (
        <QuestionCard
          key={index + con.conversationId}
          {...con}
          onSelected={onSelected}
        />
      ))}
    </div>
  );
};

export default QuestionList;