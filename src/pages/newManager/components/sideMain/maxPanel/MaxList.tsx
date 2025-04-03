import React from "react";
import styles from "./MaxList.module.css";
import MaxCard from "./MaxCard";
import { useConversationsContext } from "../../../../../context/ConversationProvider";

interface MaxList {}

const MaxList: React.FC<MaxList> = ({}) => {
  const { context } = useConversationsContext();

  return (
    <div className={styles["question-group-scroll-container"]}>
      {context.map((context) => (
        <MaxCard key={context.id} context={ context } />
      ))}
    </div>
  );
};

export default MaxList;
