import React, { useState } from "react";
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
}

const QuestionAnswerCard: React.FC<QuestionAnswerCardProps> = ({
  question,
  answer,
  setSelectedCategory,
  setSubSelectedCategory,
  defaultSelectedCategory,
  defaultSelectedSubCategory,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div>
      <CategorySection
        showBackend={true}
        onCategorySelect={setSelectedCategory}
        onSubCategorySelect={setSubSelectedCategory}
        defaultSelectedCategory={defaultSelectedCategory}
        defaultSelectedSubCategory={defaultSelectedSubCategory}
      />
      <div className={styles["question-answer-container-view"]}>
        <Checkbox checked={checked} onChange={setChecked} />
        <div className={styles["question-answer-sub-con"]}>
          <QuestionAnswerSection
            question={question}
            answer={answer}
            isEditing={false}
            onChange={() => {}}
            color={"#fff"}
            classNameStyle={styles["remove-padding"]}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerCard;
