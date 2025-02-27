import React from "react";
import LanguageSelector from "./LanguageSelector";
import QuestionItem from "./QuestionItem";
import { Conversation } from "../../util/ExampleData";

interface QuestionGroupProps {
  conversation: Conversation;
}

const QuestionGroup: React.FC<QuestionGroupProps
> = ({conversation}) => {
  return (
    <div className="question-group-container">
      <div className="question-strength-tab">
        <p>Question Strength</p>
        <LanguageSelector showTitle={false}/>
      </div>

      <div className="question-group-main">
        {conversation.messages.map((question, index) => (
          <QuestionItem key={index} {...question} />
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;