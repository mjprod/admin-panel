import React from "react";
import style from "./ChatKnowledge.module.css";
import CustomButton, {
  ButtonType,
} from "../../../components/button/CustomButton";

interface ChatKnowledgeProps {
  type: string;
  isEditQuestionLocked?: boolean;
}

const ChatKnowledge: React.FC<ChatKnowledgeProps> = ({
  type,
  isEditQuestionLocked = false,
}) => {
  const userQuestion = "Hello, How are you";
  const aiAnswer = "i'm fine";

  const edit = (
    <div className={style["edit-container"]}>
      <p> Edit</p>
    </div>
  );

  return (
    <div className={style["main-container"]}>
      <div className={style["title-container"]}>
        <p>{type}</p>
      </div>
      <div className={style["question-answer-container"]}>
        <div className={style["block-container"]}>
          <div className={style["question-block-container"]}>
            <p className={style["question-title"]}>Question:</p>
            <p>{userQuestion}</p>
          </div>
          {!isEditQuestionLocked && <div>{edit}</div>}
        </div>
        <div className={style["block-container"]}>
          <div className={style["answer-block-container"]}>
            <p className={style["answer-title"]}>Answer:</p>
            <p> {aiAnswer}</p>
          </div>
          {edit}
        </div>
      </div>

      <div className={style["question-button-actions"]}>
        <CustomButton text="Pre-Approve" type={ButtonType.Approve} />
        <CustomButton text="reject" type={ButtonType.Reject}></CustomButton>
      </div>
    </div>
  );
};

export default ChatKnowledge;
