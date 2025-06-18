import React, { useEffect } from "react";
import styles from "./BrainCard.module.css";
import Metadata from "../questionList/components/metaData/Metadata";
import { BrainItem } from "../../../../../api/responsePayload/BrainResponse";
import QuestionAnswerSection from "../questionList/components/questionAnswerSection/QuestionAnswerSection";
import CustomButton, {
  ButtonType,
} from "../../../../../components/button/CustomButton";
import { useTranslation } from "react-i18next";
import { BrainBulkDelete } from "../../../../../api/apiCalls";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { KnowledgeType } from "../../../../../util/KnowledgeType";

interface BrainCard {
  data: BrainItem;
}

const BrainCard: React.FC<BrainCard> = ({ data }) => {
  const { t } = useTranslation();
  const { searchBrain } = useConversationsContext();
  const localData = data;
  useEffect(() => {
    if (data.knowledge_type === KnowledgeType.FAQ) {
      const question = data.chunk_text.match(
        /Q:\s*([\s\S]*?)(?=\s*A:)/
      )
      localData.section_heading = question ? question[1].trim() : "";
      const answer = data.chunk_text.match(
        /A:\s*([\s\S]*)/
      )
      localData.chunk_text = answer ? answer[1].trim() : "";
    }
  }, [data])

  const { currentPage } = useSelector(
    (state: RootState) => state.pagination
  );

  const handleReject = async () => {
    try {
      await BrainBulkDelete([data.knowledge_content]);
      searchBrain("", "", currentPage)
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className={styles["question-group-scroll-container"]}>
      <div className={styles["question-group-container"]}>
        <div className={styles["question-group-main"]}>
          <div className={styles["question-container"]}>
            <Metadata
              text={`Id: ${localData.id}  KnowledgeContentId: ${localData.knowledge_content} `}
            />
            <QuestionAnswerSection
              questionTitle={localData.knowledge_type !== KnowledgeType.FAQ ? "Section Heading" : "Question"}
              answerTitle={localData.knowledge_type !== KnowledgeType.FAQ ? "Chunk Text" : "Answer"}
              question={localData.section_heading}
              answer={localData.chunk_text}
              color={"#fff"}
              classNameStyle={styles["remove-padding"]}
            />
            {localData.knowledge_type !== KnowledgeType.DOCUMENT && <div className={styles["buttons-container"]}>
              <CustomButton
                text={t("newManager.reject")}
                type={ButtonType.Reject}
                onClick={handleReject}
              />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainCard;
