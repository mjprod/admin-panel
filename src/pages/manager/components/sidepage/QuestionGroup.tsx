import React from "react";
import { Conversation } from "../../../../util/ExampleData";
import QuestionItem, { QuestionItemStatus } from "./QuestionItem";
import styles from "./QuestionGroup.module.css";

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
        aiAnswer: conversation.answer.detailed.en,
        status: conversation.review_status.includes("en") ? QuestionItemStatus.approved : QuestionItemStatus.normal,
      },
      {
        language: "MS",
        languageLabel: "Malay",
        subcategories: conversation.metadata.category,
        userQuestion: conversation.question.languages.ms,
        aiAnswer: conversation.answer.detailed.ms,
        status: conversation.review_status.includes("en") ? QuestionItemStatus.approved : QuestionItemStatus.normal,
      },
      {
        language: "CN",
        languageLabel: "Simplified Chinese",
        subcategories: conversation.metadata.category,
        userQuestion: conversation.question.languages.cn,
        aiAnswer: conversation.answer.detailed.cn,
        status: conversation.review_status.includes("cn") ? QuestionItemStatus.approved : QuestionItemStatus.normal,
      },
    ];
  };

  const languages = getLanguages(conversation);

  return (
    <div className={styles["question-group-container"]}>
      <div className={styles["question-group-main"]}>
        {languages.map((language, index) => (
          <QuestionItem
            key={index}
            conversationId={conversation.id}
            {...language}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;
