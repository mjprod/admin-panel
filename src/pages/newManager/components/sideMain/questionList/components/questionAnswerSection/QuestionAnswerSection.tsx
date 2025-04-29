import React, { useState } from "react";
import styles from "./QuestionAnswerSection.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface QuestionAnswerSectionProps {
  questionTitle?: string;
  answerTitle?: string;
  question: string | null;
  answer: string;
  isEditing?: boolean;
  onChange?: (updatedQuestion: string, updatedAnswer: string) => void;
  color: string;
  classNameStyle?: string;
}

const QuestionAnswerSection: React.FC<QuestionAnswerSectionProps> = ({
  questionTitle,
  answerTitle,
  question,
  answer,
  isEditing = false,
  onChange = () => {},
  color,
  classNameStyle,
}) => {
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const { t } = useTranslation();

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newQuestion = event.target.value;
    setEditedQuestion(newQuestion);
    onChange(newQuestion, editedAnswer);
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newAnswer = event.target.value;
    setEditedAnswer(newAnswer);
    onChange(editedQuestion ?? "", newAnswer);
  };

  return (
    <div className={clsx(styles["question-answer-container"], classNameStyle)}>
      <div className={styles["question-block-container"]}>
        <div className={styles["inline-container"]}>
          <p className={styles["question-title"]}>
            {questionTitle? questionTitle : t("newManager.user_question")}
          </p>
          {isEditing ? (
            <textarea
              value={editedQuestion ?? ""}
              onChange={handleQuestionChange}
              className={clsx(styles["qc-textarea"], styles["qc-editing-mode"])}
              style={{ backgroundColor: color }}
            />
          ) : (
            <p className={styles["qc-text"]}>{editedQuestion}</p>
          )}
        </div>
      </div>
      <div className={styles["answer-block-container"]}>
        <div className={styles["inline-container"]}>
          <p className={styles["answer-title"]}>
            {answerTitle ? answerTitle : t("newManager.suggested_answer")}
          </p>
          {isEditing ? (
            <textarea
              value={editedAnswer}
              onChange={handleAnswerChange}
              className={`${styles["qc-textarea"]} ${styles["qc-editing-mode"]}`}
              style={{ backgroundColor: color }}
            />
          ) : (
            <p className={styles["qc-text"]}>{editedAnswer}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerSection;
