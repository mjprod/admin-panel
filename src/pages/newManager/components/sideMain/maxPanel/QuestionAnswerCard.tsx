import React, { useEffect, useRef, useState } from "react";
import styles from "./QuestionAnswerCard.module.css";
import Checkbox from "../../../../../components/button/Checkbox";
import QuestionAnswerSection from "../questionList/components/questionAnswerSection/QuestionAnswerSection";
import CategorySection from "./CategorySection";

interface QuestionAnswerCardProps {
  question: string;
  answer: string;
  setSelectedCategory: (selectedCategory: number) => void;
  setSubSelectedCategory: (selectedSubCategory: number) => void;
  defaultSelectedCategory: number;
  defaultSelectedSubCategory: number;
  defaultChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onQuestionAnswerChanged: (question: string, answer: string) => void;
}

const QuestionAnswerCard: React.FC<QuestionAnswerCardProps> = ({
  question,
  answer,
  setSelectedCategory,
  setSubSelectedCategory,
  defaultSelectedCategory,
  defaultSelectedSubCategory,
  defaultChecked,
  onCheckedChange,
  onQuestionAnswerChanged,
}) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const onCheckChange = (checked: boolean) => {
    setChecked(checked);
    onCheckedChange(checked);
  };
  
  return (
    <div>
      <CategorySection
        showBackend={false}
        onCategorySelect={setSelectedCategory}
        onSubCategorySelect={setSubSelectedCategory}
        defaultSelectedCategory={defaultSelectedCategory}
        defaultSelectedSubCategory={defaultSelectedSubCategory}
      />
      <div className={styles["question-answer-container-view"]}>
        <Checkbox checked={checked} onChange={onCheckChange} />
        <div
          ref={containerRef}
          className={styles["question-answer-sub-con"]}
          onClick={() => setIsEditing(true)}
        >
          <QuestionAnswerSection
            question={question}
            answer={answer}
            isEditing={isEditing}
            onChange={onQuestionAnswerChanged}
            color={"#fff"}
            classNameStyle={styles["remove-padding"]}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerCard;
