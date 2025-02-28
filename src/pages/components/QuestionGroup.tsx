import React from "react";
// import LanguageSelector from "./LanguageSelector";
import QuestionItem from "./QuestionItem";
import { Conversation } from "../../util/ExampleData";
import { useAppDispatch } from "../../store/hooks";
import { onConversationActions } from "../../store/conversation.slice";

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
        status: conversation.answer.detailed.en.status,
      },
      {
        language: "MS",
        languageLabel: "Malay",
        subcategories: conversation.metadata.category,
        userQuestion: conversation.question.languages.ms,
        aiAnswer: conversation.answer.detailed.ms.ans,
        status: conversation.answer.detailed.ms.status,
      },
      {
        language: "CN",
        languageLabel: "Simplified Chinese",
        subcategories: conversation.metadata.category,
        userQuestion: conversation.question.languages.cn,
        aiAnswer: conversation.answer.detailed.cn.ans,
        status: conversation.answer.detailed.cn.status,
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
          convs.answer.detailed.en.ans = text;
          convs.answer.detailed.en.status = 1;
          break;
        }

        case "MS": {
          convs.answer.detailed.ms.ans = text;
          convs.answer.detailed.ms.status = 1;
          break;
        }

        case "CN": {
          convs.answer.detailed.cn.ans = text;
          convs.answer.detailed.cn.status = 1;
          break;
        }
      }
      convs.action_status.completed = convs.action_status.completed + 1;
    };

    conv();
    console.log("conv", convs);
    dispatch(onConversationActions.updateConversation(convs));
  };
  return (
    <div className="question-group-container">
      {/* <div className="question-strength-tab">
        <p>Question Strength</p>
        <LanguageSelector showTitle={false} />
      </div> */}

      <div className="question-group-main">
        {languages.map((language, index) => (
          <QuestionItem
            key={index}
            {...language}
            updateKnowledge={updateKnowledge}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionGroup;
