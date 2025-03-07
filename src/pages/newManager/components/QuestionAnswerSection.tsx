import React from "react";
import styles from "./QuestionAnswerSection.module.css";

const QuestionAnswerSection: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => (
  <div className={styles["question-answer-container"]}>
    <div className={styles["question-block-container"]}>
      <p className={styles["question-title"]}>Soalan Pengguna: </p>
      <p>{question}</p>
    </div>
    <div className={styles["answer-block-container"]}>
      <p className={styles["answer-title"]}>Cadang Ai menjawab: </p>
      <p>{answer}</p>
    </div>
  </div>
);

export default QuestionAnswerSection