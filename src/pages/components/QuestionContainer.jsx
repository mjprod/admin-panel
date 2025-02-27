import React from "react";

const QuestionContainer = () => {
  return (
    <div className="question-container">
      <div className="row01 language">
        <div className="language-indicator">MY</div>&nbsp;Malay
      </div>
      <div className="row02 subcategory-container">
        <div className="badge subcategory">Subcategory 01</div>
      </div>
      <div className="row03 question-answer-container">
        <div className="question-block-container">
          <p className="question-title">User Question:</p>
          <p>Why is my deposit not showing?</p>
        </div>
        <div className="answer-block-container">
          <p className="answer-title">Suggested Ai:</p>
          <p>Why is my deposit not showing?</p>
        </div>
      </div>
      <div className="row04 question-button-actions">
        <button className="pre-approve">Pre-Approve</button>
        <button className="reject">Reject</button>
      </div>
    </div>
  );
};

export default QuestionContainer;