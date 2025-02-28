import React, { useState } from "react";
import CustomButton, { ButtonType } from "../../components/button/CustomButton";
import Badge, { BadgeType } from "../../components/Badge";

interface QuestionItemProps {
  language: string;
  languageLabel: string;
  subcategories: string[];
  userQuestion: string;
  aiAnswer: string;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  language,
  languageLabel,
  subcategories,
  userQuestion,
  aiAnswer,
}) => {
  const [isEditSelected, setEditSelected] = useState(false);
  const [text, setText] = useState(aiAnswer);
  const [approveText, setApprovedText] = useState("Approve");
  const [rejectText, setRejectText] = useState("Reject");
  const [actionDone, setActionDone] = useState(false);

  const edit = (
    <div>
      {!isEditSelected && !actionDone && (
        <div
          className={"edit-container"}
          onClick={() => {
            setEditSelected(!isEditSelected)
            setApprovedText("Done");
            setRejectText("Cancel");
          }}
        >
          <p> Edit</p>
        </div>
      )}
    </div>
  );

  const editAnswer = (
    <div className={"input-container"}>
      {/* Input Field */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={"input"}
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
      setRejectText("Reject");
      setText(aiAnswer);
    } else {
      setActionDone(true);
    }
  };

  const handleApprove = () => {
    if (isEditSelected) {
      setEditSelected(false);
      setApprovedText("Approve");
      setRejectText("Reject");

    } else {
      setActionDone(true);
    }
  };

  return (
    <div className="question-container">
      {/* Language Indicator */}
      <div className="row01 language">
        <div className="language-indicator">{language}</div>&nbsp;
        {languageLabel}
      </div>

      {/* Subcategories */}
      <div className="row02 subcategory-container">
        {subcategories.map((subcategory, index) => (
          <Badge key={index} text={subcategory} type={BadgeType.subcategory} />
        ))}
      </div>

      {/* Question & AI Suggested Answer */}
      <div className="row03 question-answer-container">
        <div className="question-block-container">
          <p className="question-title">User Question:</p>
          <p>{userQuestion}</p>
        </div>
        <div className={"block-container"}>
          <div className="answer-block-container">
            <p className="answer-title">Suggested AI:</p>
            {ViewOrEditAnswer}
          </div>

          {edit}
        </div>
      </div>

      {/* Buttons */}
      <div className="row04 question-button-actions">
        {!actionDone && <CustomButton text={approveText} type={ButtonType.Approve} onClick={handleApprove}/> }
        {!actionDone && <CustomButton text={rejectText} type={ButtonType.Reject} onClick={handleReject}></CustomButton> }
      </div>
    </div>
  );
};

export default QuestionItem;
