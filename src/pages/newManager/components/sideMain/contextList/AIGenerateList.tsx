// AIGenerateList.tsx
import React from "react";
import styles from "./AIGenerateList.module.css";
import QuestionAnswerCard from "./QuestionAnswerCard";
import { EditablePair } from "../../../../../api/responsePayload/KnowledgeResponse";

interface AIGenerateListProps {
  loading: boolean;
  contextId: number;
  pairs: EditablePair[];
  onUpdatePair: (index: number, updatedFields: Partial<EditablePair>) => void;
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
  if (loading) {
    return (
      <div className={styles["spinner-container"]}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <>
      {pairs.map((pair, index) => (
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
        />
      ))}
    </>
  );
};

export default AIGenerateList;