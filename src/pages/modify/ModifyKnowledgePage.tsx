import React from "react";
import ChatKnowledge from "./components/ChatKnowledge";
import style from "./ModifyKnowledgePage.module.css";

const ModifyKnowledgePage = () => {
  return (
    <div className={style["main-container"]}>
      <ChatKnowledge type="Current Chat Info" />
      <ChatKnowledge type="Knowledge Info" isEditQuestionLocked={true} />
    </div>
  );
};

export default ModifyKnowledgePage;
