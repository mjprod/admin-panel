import React, { useState } from "react";
import styles from "./ContextList.module.css";
import ContextCard from "./ContextCard";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import { EditablePair } from "../../../../../api/responsePayload/KnowledgeResponse";

interface ContextListProps { }

const ContextList: React.FC<ContextListProps> = ({ }) => {
  const { context, addedPairs } = useConversationsContext();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
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
        <ContextCard
          key={context.id}
          context={context}
          onChecked={handleCardSelected}
          checked={selectedCardId === context.id}
          setChecked={() => {
            setSelectedCardId((prevId) => (prevId === context.id ? null : context.id))
          }}
        />
      ))}
    </div>
  );
};

export default ContextList;
