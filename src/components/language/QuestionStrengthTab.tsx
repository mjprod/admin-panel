import React from "react";
import styles from "./QuestionStrengthTab.module.css";
import LanguageList from "./LanguageList";
import { LanguageProps } from "./Language";

interface QuestionStrengthTabProps {
  languages: LanguageProps[];
}

const QuestionStrengthTab: React.FC<QuestionStrengthTabProps> = ({
  languages,
}) => {
  return (
    <div className={styles["question-strength-tab"]}>
      <p>Question Strength</p>
      <LanguageList languages={languages} />
    </div>
  );
};

export default QuestionStrengthTab
