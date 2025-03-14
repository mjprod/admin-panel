import React from "react";
import ChatKnowledge from "./components/ChatKnowledge";
import style from "./ModifyKnowledgePage.module.css";
import CustomButton from "../../components/button/CustomButton";

const ModifyKnowledgePage = () => {
  return (
    <div className={style["page-container"]}>
      <div className={style["content-wrapper"]}>
        <div className={style["main-container"]}>
          <ChatKnowledge type="Current Chat Info" rejectText="Ignore" />
          <ChatKnowledge
            type="Knowledge Info"
            isEditQuestionLocked={true}
            approveText="Accept"
            rejectText="Lower Confidence"
          />
        </div>
        <CustomButton text="Back" />
      </div>
    </div>
  );
};

export default ModifyKnowledgePage;
