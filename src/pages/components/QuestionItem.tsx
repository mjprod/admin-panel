import React from "react";
import CustomButton, { ButtonType } from "../../components/button/CustomButton";

interface QuestionItemProps {
  language: string;
  languageLabel: string;
  subcategories: string[];
  userQuestion: string;
  aiAnswer: string;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ language, languageLabel, subcategories, userQuestion, aiAnswer }) => {
  return (
    <div className="question-container">
      {/* Language Indicator */}
      <div className="row01 language">
        <div className="language-indicator">{language}</div>&nbsp;{languageLabel}
      </div>

      {/* Subcategories */}
      <div className="row02 subcategory-container">
        {subcategories.map((subcategory, index) => (
          <div key={index} className="badge subcategory">{subcategory}</div>
        ))}
      </div>

      {/* Question & AI Suggested Answer */}
      <div className="row03 question-answer-container">
        <div className="question-block-container">
          <p className="question-title">User Question:</p>
          <p>{userQuestion}</p>
        </div>
        <div className="answer-block-container">
          <p className="answer-title">Suggested AI:</p>
          <p>{aiAnswer}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="row04 question-button-actions">
        <CustomButton text="Pre-Approve" type={ButtonType.Approve}/>
        <CustomButton text="reject" type={ButtonType.Reject}></CustomButton>
      </div>
    </div>
  );
};

export default QuestionItem;