import React from "react";
import CreateNewButton from "./newManager/components/CreateNewButton";
import ChatHistoryButton from "./newManager/components/ChatHistoryButton";
import QuestionCard from "./newManager/components/QuestionCard";
import { KnowledgeStatus } from "../api/responsePayload/KnowledgeResponse";

const TestPage = () => {
  return (
    <div>
      <CreateNewButton />
      <ChatHistoryButton />
      <QuestionCard
        knowledgeId={1}
        id={1}
        dateTime={"15/2/2025"}
        conversationId={"1"}
        category={null}
        languages={[]}
        currentlang={{ lang: "ms", langLabel: "Mayla" }}
        subcategories={null}
        question={"1111111"}
        answer={"1111111"}
        status={KnowledgeStatus.NeedReview}
      />
    </div>
  );
};

export default TestPage;
