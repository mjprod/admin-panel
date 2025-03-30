import React from "react";
import styles from "./QuestionAnswerCard.module.css";
import Checkbox from "../../../../../components/button/Checkbox";
import QuestionAnswerSection from "../questionList/components/questionAnswerSection/QuestionAnswerSection";
import CategorySection from "./CategorySection";

interface QuestionAnswerCardProps {
  setSelectedCategory: (selectedCategory: number) => void;
  setSubSelectedCategory: (selectedSubCategory: number) => void;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const QuestionAnswerCard: React.FC<QuestionAnswerCardProps> = ({
  setSelectedCategory,
  setSubSelectedCategory,
  checked,
  onChange,
}) => {
  return (
    <div>
      <CategorySection
        setSelectedCategory={setSelectedCategory}
        setSubSelectedCategory={setSubSelectedCategory}
        showBackend={true}
      />
      <div className={styles["question-answer-container-view"]}>
        <Checkbox checked={checked} onChange={onChange} />
        <div className={styles["question-answer-sub-con"]}>
          <QuestionAnswerSection
            question={"Could you please investigate why my deposit is missing?"}
            answer={
              "Give it another 5 minutes, and then see if the funds have appeared"
            }
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
