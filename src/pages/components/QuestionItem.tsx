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

  const edit = (
    <div>
      {!isEditSelected && (
        <div
          className={"edit-container"}
          onClick={() => setEditSelected(!isEditSelected)}
        >
          <p> Edit</p>
        </div>
      )}
    </div>
  );

  const editAnswer = (
    <div className={"input-container"}>
      {/* Input Field */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={"input"}
      />
    </div>
  );

  const ViewOrEditAnswer = (
    <div>{!isEditSelected ? <p>{aiAnswer}</p> : <div>{editAnswer}</div>}</div>
  );

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
        <CustomButton text="Pre-Approve" type={ButtonType.Approve} />
        <CustomButton text="reject" type={ButtonType.Reject}></CustomButton>
      </div>
    </div>
  );
};

export default QuestionItem;
