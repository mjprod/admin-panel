import React from "react";
import LanguageSelector from "./LanguageSelector";
import QuestionItem from "./QuestionItem";

const QuestionGroup = () => {
      const questionsData = [
        {
          language: "MY",
          languageLabel: "Malay",
          subcategories: ["Subcategory 01", "Subcategory 01"],
          userQuestion: "Why is my deposit not showing?",
          aiAnswer: "Why is my deposit not showing?",
        },
        {
          language: "MY",
          languageLabel: "Malay",
          subcategories: ["Subcategory 01", "Subcategory 01"],
          userQuestion: "Why is my deposit not showing?",
          aiAnswer: "Why is my deposit not showing?",
        },
        {
          language: "MY",
          languageLabel: "Malay",
          subcategories: ["Subcategory 01", "Subcategory 01"],
          userQuestion: "Why is my deposit not showing?",
          aiAnswer: "Why is my deposit not showing?",
        },
      ];

  return (
    <div className="question-group-container">
      <div className="question-strength-tab">
        <p>Question Strength</p>
        <LanguageSelector />
      </div>

      <div className="question-group-main">
        {questionsData.map((question, index) => (
          <QuestionItem key={index} {...question} />
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;