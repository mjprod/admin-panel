import React from "react";
// import LanguageSelector from "./LanguageSelector";
import { onConversationActions } from "../../store/conversation.slice";
import { useAppDispatch } from "../../store/hooks";
import { Conversation } from "../../util/ExampleData";
import QuestionItem from "./QuestionItem";
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
        status: conversation.review_status.includes("en") ? 1 : 0,
      },
      {
        language: "MS",
        languageLabel: "Malay",
        subcategories: conversation.metadata.category,
        userQuestion: conversation.question.languages.ms,
        aiAnswer: conversation.answer.detailed.ms,
        status: conversation.review_status.includes("ms") ? 1 : 0,
      },
      {
        language: "CN",
        languageLabel: "Simplified Chinese",
        subcategories: conversation.metadata.category,
        userQuestion: conversation.question.languages.cn,
        aiAnswer: conversation.answer.detailed.cn,
        status: conversation.review_status.includes("cn") ? 1 : 0,
      },
    ];
  };

  const languages = getLanguages(conversation);

  const dispatch = useAppDispatch();

  const updateKnowledge = (text: string, language: string) => {
    const convs = JSON.parse(JSON.stringify(conversation));

    const conv = () => {
      switch (language) {
        case "EN": {
          convs.answer.detailed.en = text;
          convs.review_status.push("en");
          break;
        }

        case "MS": {
          convs.answer.detailed.ms = text;
          convs.review_status.push("ms");
          break;
        }

        case "CN": {
          convs.answer.detailed.cn = text;
          convs.review_status.push("cn");
          break;
        }
      }
    };

    conv();
    console.log("conv", convs);
    dispatch(onConversationActions.updateConversation(convs));
  };

  return (
    <div className={styles["question-group-container"]}>
      {/* <div className={styles["question-strength-tab"]}>
        <p>Question Strength</p>
        <LanguageSelector showTitle={false} />
      </div> */}

      <div className={styles["question-group-main"]}>
        {languages.map((language, index) => (
          <QuestionItem
            key={index}
            conversationId={conversation.id}
            {...language}
            updateKnowledge={updateKnowledge}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;
