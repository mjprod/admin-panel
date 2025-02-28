import React from "react";
// import LanguageSelector from "./LanguageSelector";
import QuestionItem from "./QuestionItem";
import { Conversation } from "../../util/ExampleData";

interface QuestionGroupProps {
  conversation: Conversation;
}

const QuestionGroup: React.FC<QuestionGroupProps> = ({ conversation }) => {
  const getLanguages = (conversation: Conversation) => {
    return [
      {
        language: "EN",
        languageLabel: "English",
        subcategories: conversation.metadata.category,
        userQuestion: conversation.question.languages.en,
        aiAnswer: conversation.answer.detailed.en.ans,
        status: conversation.answer.detailed.en.status
      },
      {
        language: "MS",
        languageLabel: "Malay",
        subcategories: conversation.metadata.category,
        userQuestion: conversation.question.languages.ms,
        aiAnswer: conversation.answer.detailed.ms.ans,
        status: conversation.answer.detailed.ms.status
      },
      {
        language: "CN",
        languageLabel: "Simplified Chinese",
        subcategories: conversation.metadata.category,
        userQuestion: conversation.question.languages.cn,
        aiAnswer: conversation.answer.detailed.cn.ans,
        status: conversation.answer.detailed.cn.status
      },
    ];
  };

  const languages = getLanguages(conversation);

  return (
    <div className="question-group-container">
      {/* <div className="question-strength-tab">
        <p>Question Strength</p>
        <LanguageSelector showTitle={false} />
      </div> */}

      <div className="question-group-main">
        {languages.map((language, index) => (
          <QuestionItem key={index} {...language} />
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;
