import React, { useEffect, useState } from "react";
import styles from "./ContextList.module.css";
import ContextCard from "./ContextCard";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import { EditablePair } from "../../../../../api/responsePayload/KnowledgeResponse";
import { useAppDispatch } from "../../../../../store/hooks";
import { updateContextSelection } from "../../../../../store/context.slice";

interface ContextListProps { }

const ContextList: React.FC<ContextListProps> = ({ }) => {
  const { context, addedPairs } = useConversationsContext();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleCardSelected = (checked: boolean, contextId: number, pairs: EditablePair[]) => {
    if (checked) {
      addedPairs[contextId] = pairs;
    } else {
      delete addedPairs[contextId];
    }
  };

  useEffect(() => {
    dispatch(updateContextSelection(selectedCardId !== null));
  }, [selectedCardId, dispatch])

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
