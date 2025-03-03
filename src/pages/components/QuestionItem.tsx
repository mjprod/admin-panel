import clsx from "clsx";
import React, { useState } from "react";
import Badge, { BadgeType } from "../../components/Badge";
import CustomButton, { ButtonType } from "../../components/button/CustomButton";

import { AddLanguageReviewed } from "../../api/auth";
import { useAppDispatch } from "../../store/hooks";
import styles from "./QuestionItem.module.css";
import Language from "../../components/language/Language";

interface QuestionItemProps {
  conversationId: string;
  language: string;
  languageLabel: string;
  subcategories: string[];
  userQuestion: string;
  aiAnswer: string;
  status?: number;
  updateKnowledge: (text: string, language: string) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  conversationId,
  language,
  languageLabel,
  subcategories,
  userQuestion,
  aiAnswer,
  status = 0,
  updateKnowledge,
}) => {
  const [isEditSelected, setEditSelected] = useState(false);
  const [text, setText] = useState(aiAnswer);
  const [approveText, setApprovedText] = useState("Approve");
  const [rejectText, setRejectText] = useState("Edit");
  const [actionDone, setActionDone] = useState<boolean>(status !== 0);

  const dispatch = useAppDispatch();
  // const edit = (
  //   <div>
  //     {!isEditSelected && !actionDone && (
  //       <div
  //         className={"edit-container"}
  //         onClick={() => {
  //           setEditSelected(!isEditSelected);
  //           setApprovedText("Done");
  //           setRejectText("Cancel");
  //         }}
  //       >
  //         <p> Edit</p>
  //       </div>
  //     )}
  //   </div>
  // );

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
    <div>{!isEditSelected ? <p>{text}</p> : <div>{editAnswer}</div>}</div>
  );

  const handleReject = () => {
    if (isEditSelected) {
      setEditSelected(false);
      setApprovedText("Approve");
      setRejectText("Edit");
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
      setApprovedText("Approve");
      setRejectText("Edit");
    } else {
      dispatch(setLanguageReviewed());
    }
  };

  const setLanguageReviewed = () => {
    return async () => {
      try {
        const res = await AddLanguageReviewed(
          conversationId,
          language.toLowerCase(),
          text
        );
        if (res != null) {
          setActionDone(true);
          updateKnowledge(text, language);
        }
      } catch (error) {
        throw error;
      }
    };
  };

  return (
    <div className={clsx(styles["question-container"], actionDone && styles["action-done"])}>
      {/* Language Indicator */}
      <div className={styles["row01"]}>
        <Language lang={language} />&nbsp;
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
        {!actionDone && (
          <CustomButton
            text={approveText}
            type={ButtonType.Approve}
            onClick={handleApprove}
          />
        )}
        {!actionDone && (
          <CustomButton
            text={rejectText}
            type={ButtonType.Reject}
            onClick={handleReject}
          ></CustomButton>
        )}
      </div>
    </div>
  );
};

export default QuestionItem;
