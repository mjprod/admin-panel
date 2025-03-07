import React from "react";
import styles from "./QuestionCard.module.css";
import QuestionStrengthTab from "../../../components/language/QuestionStrengthTab";
import CustomButton, {
  ButtonType,
} from "../../../components/button/CustomButton";
import Badge, { BadgeType } from "../../../components/badge/Badge";
import Language, { LanguageProps } from "../../../components/language/Language";
import clsx from "clsx";

export enum QuestionCardStatus {
  NeedApproval,
  PreApproved,
  Rejected,
}

export interface QuestionCardProps {
  date: string;
  time: string;
  conversationId: string;
  category: string;
  languages: LanguageProps[];
  currentlang: LanguageProps;
  subcategories: string[];
  question: string;
  answer: string;
  status: QuestionCardStatus;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  date,
  time,
  conversationId,
  category,
  languages,
  currentlang,
  subcategories,
  question,
  answer,
  //   status,
}) => {
  const handleReject = () => {};

  const handleEdit = () => {};

  const handlePreApprove = () => {};

  return (
    <div className={styles["question-group-container"]}>
      <QuestionStrengthTab languages={languages} />
      <div
        className={clsx(styles["question-group-main"], styles["badge-color09"])}
      >
        <div className={styles["question-container"]}>
          <div className={styles["question-metadata"]}>
            <p>
              {" "}
              {date} | {time}
            </p>
            <p>Conversation ID: {conversationId}</p>
          </div>
          <div className={styles["language"]}>
            <Badge text={category} />
            <div className={styles["rightcol"]}>
              <Language
                lang={currentlang.lang}
                langLabel={currentlang.langLabel}
              />
            </div>
          </div>
          <div className={styles["subcategory-container"]}>
            {subcategories.map((subcategory, index) => (
              <Badge
                key={index}
                text={subcategory}
                type={BadgeType.subcategory}
              />
            ))}
          </div>
          <div className={styles["question-answer-container"]}>
            <div className={styles["question-block-container"]}>
              <p className={styles["question-title"]}>Soalan Pengguna:</p>
              <p>{question}</p>
            </div>
            <div className={styles["answer-block-container"]}>
              <p className={styles["answer-title"]}>Cadang Ai menjawab</p>
              <p>{answer}</p>
            </div>
          </div>
          <div className={styles["question-button-actions"]}>
            <CustomButton
              text="Tolak"
              type={ButtonType.Reject}
              onClick={handleReject}
            ></CustomButton>
            <div className={styles["rightcol-buttons"]}>
              <CustomButton
                text="Sunting"
                type={ButtonType.Edit}
                onClick={handleEdit}
              ></CustomButton>
              <CustomButton
                text="Pra-Kelulusan"
                type={ButtonType.Approve}
                onClick={handlePreApprove}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
