import React from "react";
import styles from "./BrainList.module.css";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import BrainCard from "./BrainCard";

interface BrainList { }

const BrainList: React.FC<BrainList> = ({ }) => {
  const { brainList } = useConversationsContext();

  return (
    <div className={styles["question-group-scroll-container"]}>
      {brainList && brainList.map((brain) => (
        <BrainCard key={brain.id} data={brain} />
      ))}
    </div>
  );
};

export default BrainList;
