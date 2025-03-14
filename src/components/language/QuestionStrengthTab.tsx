import React from "react";
import styles from "./QuestionStrengthTab.module.css";
import LanguageList from "./LanguageList";
import { LanguageProps } from "./Language";
import { useTranslation } from "react-i18next";

interface QuestionStrengthTabProps {
  languages: LanguageProps[];
}

const QuestionStrengthTab: React.FC<QuestionStrengthTabProps> = ({
  languages,
}) => {
  const {t} = useTranslation();
  return (
    <div className={styles["question-strength-tab"]}>
      <p>{t("newManager.question_strength")}</p>
      <LanguageList languages={languages} />
    </div>
  );
};

export default QuestionStrengthTab
