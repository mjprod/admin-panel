import React from "react";
import CreateNewButton from "./newManager/components/sideBar/createNewButton/CreateNewButton";
import { KnowledgeStatus, Language } from "../api/responsePayload/KnowledgeResponse";
import { ChatType } from "../components/popUp/popUpChatHistory/ChatDialog";
import QuestionCard from "./newManager/components/sideMain/questionList/components/questionCard/QuestionCard";

const TestPage = () => {
  const context = {
    conversationId: "12tgvbhhgbhnj",
    date_time: "09/09/2029",
    chat_data: [
      {
        id: 123,
        type: ChatType.User,
        datetime: "09/09/2029",
        message: "wertyhbvfgyhujkl",
        isActive: false,
      },
    ],
  };
  return (
    <div>
      <CreateNewButton />
      <QuestionCard
        knowledgeId={1}
        id={1}
        dateTime={"15/2/2025"}
        conversationId={"1"}
        category={null}
        languages={[]}
        currentlang={{ lang: Language.MALAYSIAN, langLabel: "Mayla" }}
        subcategories={null}
        question={"1111111"}
        answer={"1111111"}
        status={KnowledgeStatus.NeedReview}
        context={context}
      />
    </div>
  );
};

export default TestPage;
