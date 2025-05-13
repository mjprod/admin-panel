import React from "react";
import styles from "./BrainCard.module.css";
import Metadata from "../questionList/components/metaData/Metadata";
import { BrainItem } from "../../../../../api/responsePayload/BrainResponse";
import QuestionAnswerSection from "../questionList/components/questionAnswerSection/QuestionAnswerSection";

interface BrainCard {
  data: BrainItem;
}

const BrainCard: React.FC<BrainCard> = ({ data }) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainCard;
