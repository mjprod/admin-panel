// AIGenerateList.tsx
import React, { useEffect, useState } from "react";
import styles from "./AIGenerateList.module.css";
import QuestionAnswerCard from "./QuestionAnswerCard";
import { EditablePair } from "../../../../../api/responsePayload/KnowledgeResponse";
import { showConsoleError } from "../../../../../util/ConsoleMessage";
import { KowledgeContentBulkCreate } from "../../../../../api/apiCalls";

interface AIGenerateListProps {
  loading: boolean;
  contextId: number;
  pairs: EditablePair[];
  onUpdatePair: (index: number, updatedFields: Partial<EditablePair>, removePair?: EditablePair) => void;
  onQuestionAnswerChange: (
    index: number,
    question: string,
    answer: string
  ) => void;
}

const AIGenerateList: React.FC<AIGenerateListProps> = ({
  loading,
  contextId,
  pairs,
  onUpdatePair,
  onQuestionAnswerChange,
}) => {
  const [pairsValue, setPairsValue] = useState<EditablePair[]>(pairs);

  useEffect(() => {
    setPairsValue(pairs)
  }, [pairs])

  if (loading) {
    return (
      <div className={styles["spinner-container"]}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const handleApprove = async (index: number, selectedPairs: EditablePair) => {
    try {
      await KowledgeContentBulkCreate({ [contextId]: [selectedPairs] });
      onUpdatePair(index, {}, selectedPairs)
    } catch (e) {
      showConsoleError(e);
    }
  };

  return (
    <div className={styles['main-container']}>
      {pairsValue.map((pair, index) => (
        <QuestionAnswerCard
          key={`${contextId}-${pair.id}`}
          question={pair.question}
          answer={pair.answer}
          setSelectedCategory={(id) =>
            onUpdatePair(index, { category_id: id })
          }
          setSubSelectedCategory={(id) =>
            onUpdatePair(index, { subcategory_id: id })
          }
          defaultSelectedCategory={pair.category_id}
          defaultSelectedSubCategory={pair.subcategory_id}
          defaultChecked={pair.selected}
          onCheckedChange={(val) => onUpdatePair(index, { selected: val })}
          onQuestionAnswerChanged={(question, answer) =>
            onQuestionAnswerChange(index, question, answer)
          }
          approveCallback={() => handleApprove(index, pair)}
        />
      ))}
    </div>
  );
};

export default AIGenerateList;