import React from "react";
import styles from "./MaxList.module.css";
import MaxCard from "./MaxCard";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import { EditablePair } from "../../../../../api/responsePayload/KnowledgeResponse";

interface MaxList {}

const MaxList: React.FC<MaxList> = ({}) => {
  const { context, addedPairs } = useConversationsContext();

  const handleCardSelected = (checked: boolean, contextId: number, pairs: EditablePair[]) => {
    if (checked) {
      addedPairs[contextId] = pairs;
    } else {
      delete addedPairs[contextId];
    }
  };

  return (
    <div className={styles["question-group-scroll-container"]}>
      {context.map((context) => (
        <MaxCard
          key={context.id}
          context={context}
          onChecked={handleCardSelected}
        />
      ))}
    </div>
  );
};

export default MaxList;
