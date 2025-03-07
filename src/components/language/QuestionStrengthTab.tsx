import React from "react";
import styles from "./QuestionStrengthTab.module.css";
import LanguageList from "./LanguageList";
import { LanguageProps } from "./Language";

const QuestionStrengthTab = () => {
  const languages: LanguageProps[] = [{
      lang: "MY",
      isSolid: true
  },
  {
      lang: "CN"
  },
  {
      lang: "EN",
      isCompleted: true
  }
];
  return (
    <div className={styles["question-strength-tab"]}>
      <p>Question Strength</p>
      <LanguageList languages={languages} />
    </div>
  );
};

export default QuestionStrengthTab
