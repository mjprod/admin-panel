import clsx from "clsx";
import React, { useState } from "react";
import Badge, { BadgeType } from "../../../../components/badge/Badge";
import CustomButton, { ButtonType } from "../../../../components/button/CustomButton";

import styles from "./QuestionItem.module.css";
import Language from "../../../../components/language/Language";

export enum QuestionItemStatus {
  approved,
  pending,
  normal
}

interface QuestionItemProps {
  conversationId: string;
  language: string;
  languageLabel: string;
  subcategories: string[];
  userQuestion: string;
  aiAnswer: string;
  status?: QuestionItemStatus;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  // conversationId,
  language,
  languageLabel,
  subcategories,
  userQuestion,
  aiAnswer,
  status = QuestionItemStatus.normal,
}) => {
  const initApproveText = "Pre-Approve";
  const initRejectText = "Edit";

  const [isEditSelected, setEditSelected] = useState(false);
  const [text, setText] = useState(aiAnswer);
  const [approveText, setApprovedText] = useState(initApproveText);
  const [rejectText, setRejectText] = useState(initRejectText);
  const [action, setAction] = useState<QuestionItemStatus>(status)

  const editAnswer = (
    <div className={styles["input-container"]}>
      {/* Input Field */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles["input"]}
        autoFocus
        onFocus={(e) => e.target.select()}
        rows={4}
        style={{ resize: "vertical" }}
      />
    </div>
  );

  const ViewOrEditAnswer = (
    <div>
      {!isEditSelected ? (
        <p
          dangerouslySetInnerHTML={{
            __html: text.replace(/\\r\\n|\\r|\\n/g, "<br>"),
          }}
        />
      ) : (
        <div>{editAnswer}</div>
      )}
    </div>
  );

  const handleReject = () => {
    if (isEditSelected) {
      setEditSelected(false);
      setApprovedText(initApproveText);
      setRejectText(initRejectText);
      setText(aiAnswer);
    } else {
      setEditSelected(!isEditSelected);
      setApprovedText("Done");
      setRejectText("Cancel");
    }
  };

  const handleApprove = () => {
    if (isEditSelected) {
      setEditSelected(false);
      setApprovedText(initApproveText);
      setRejectText(initRejectText);
    } else {
      setAction(QuestionItemStatus.pending)
    }
  };

  const handleRemove = () => {
    setAction(status)
  };

  return (
    <div
      className={clsx(
        styles["question-container"],
        action == QuestionItemStatus.approved && styles["action-done"]
      )}
    >
      {/* Language Indicator */}
      <div className={styles["row01"]}>
        <Language lang={language} />
        &nbsp;
        {languageLabel}
      </div>

      {/* Subcategories */}
      <div className={styles["row02"]}>
        {subcategories.map((subcategory, index) => (
          <Badge key={index} text={subcategory} type={BadgeType.subcategory} />
        ))}
      </div>

      {/* Question & AI Suggested Answer */}
      <div className={styles["row03"]}>
        <div className={styles["question-block-container"]}>
          <p className={styles["question-title"]}>User Question:</p>
          <p>{userQuestion}</p>
        </div>
        <div className={styles["block-container"]}>
          <div className={styles["answer-block-container"]}>
            <p className={styles["answer-title"]}>Suggested AI:</p>
            {ViewOrEditAnswer}
          </div>

          {/* {edit} */}
        </div>
      </div>

      {/* Buttons */}
      <div className={styles["row04"]}>
      {action == QuestionItemStatus.pending ? (
        <CustomButton text="Remove From Pre-Approve" onClick={handleRemove}/>
      ) : action !== QuestionItemStatus.approved ? (
        <>
          <CustomButton
            text={approveText}
            type={ButtonType.Approve}
            onClick={handleApprove}
          />
          <CustomButton
            text={rejectText}
            type={ButtonType.Reject}
            onClick={handleReject}
          ></CustomButton>
        </>
      ) : null }
      </div>
    </div>
  );
};

export default QuestionItem;
