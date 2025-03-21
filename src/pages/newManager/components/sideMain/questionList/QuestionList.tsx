import React from "react";
import styles from "./QuestionList.module.css";
import { KnowledgeCard } from "../../../../../api/responsePayload/KnowledgeResponse";
import QuestionCard from "./components/questionCard/QuestionCard";

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