import React from "react";
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

interface BrainCard {
  data: BrainItem;
}

const BrainCard: React.FC<BrainCard> = ({ data }) => {
  const { t } = useTranslation();
  const {searchBrain, currentPage} = useConversationsContext();

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
              text={`Id: ${data.id}  KnowledgeContentId: ${data.knowledge_content} `}
            />
            <QuestionAnswerSection
              questionTitle="Section Heading"
              answerTitle="Chunk Text"
              question={data.section_heading}
              answer={data.chunk_text}
              color={"#fff"}
              classNameStyle={styles["remove-padding"]}
            />
            <div className={styles["buttons-container"]}>
              <CustomButton
                text={t("newManager.reject")}
                type={ButtonType.Reject}
                onClick={handleReject}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainCard;
