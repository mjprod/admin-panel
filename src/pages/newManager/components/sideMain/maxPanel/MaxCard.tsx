import React, { useEffect, useState } from "react";
import styles from "./MaxCard.module.css";
import Metadata from "../questionList/components/metaData/Metadata";
import ChatHistoryButton from "../questionList/components/chatHistoryButton/ChatHistoryButton";
import CustomButton, {
  ButtonType,
} from "../../../../../components/button/CustomButton";
import { useTranslation } from "react-i18next";
import {
  ContextItem,
  EditablePair,
  KnowledgeContext,
} from "../../../../../api/responsePayload/KnowledgeResponse";
import { GetContextAI } from "../../../../../api/apiCalls";
import QuestionAnswerCard from "./QuestionAnswerCard";
import { mapToKnowledgeContext } from "../../../../../api/util/responseMap";

interface MaxCard {
  context: ContextItem;
}

const MaxCard: React.FC<MaxCard> = ({ context }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [pairs, setPairs] = useState<EditablePair[]>([]);
  const [chatData, setChatData] = useState<KnowledgeContext>();

  const handleReject = () => {};

  const handleRegenerate = () => {};

  const handleApprove = () => {};

  const updatePair = (index: number, updatedFields: Partial<EditablePair>) => {
    setPairs((prev) =>
      prev.map((pair, i) =>
        i === index ? { ...pair, ...updatedFields } : pair
      )
    );
  };

  useEffect(() => {
    const getAIResponse = async () => {
      try {
        setLoading(true)
        const res = await GetContextAI(context.id);
        const messages: string[] =
          res?.flatMap((item) => [item.question, item.answer]) ?? [];
        const chat = mapToKnowledgeContext(context.context, messages);
        setChatData(chat ?? undefined);
        const enhancedPairs = (res ?? []).map((item) => ({
          ...item,
          selected: false,
        }));
        setPairs(enhancedPairs);
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    };
    getAIResponse();
  }, [context]);

  return (
    <div className={styles["question-group-scroll-container"]}>
      <div className={styles["question-group-container"]}>
        <div className={styles["question-group-main"]}>
          <div className={styles["question-container"]}>
            <Metadata
              date={context.date_created}
              time={context.date_created}
              conversationId={""}
            />

            <div className={styles["question-chat-history"]}>
              <ChatHistoryButton conversationData={chatData} />
            </div>
            {loading && <div className={styles.spinner}></div>}
            {pairs.map((pair, index) => (
              <QuestionAnswerCard
                question={pair.question}
                answer={pair.answer}
                setSelectedCategory={(id) =>
                  updatePair(index, { category_id: id })
                }
                setSubSelectedCategory={(id) =>
                  updatePair(index, { subcategory_id: id })
                }
                defaultSelectedCategory={pair.category_id}
                defaultSelectedSubCategory={pair.subcategory_id}
              />
            ))}

            <div className={styles["buttons-container"]}>
              <CustomButton
                text={t("newManager.reject")}
                type={ButtonType.Reject}
                onClick={handleReject}
              />
              <div className={styles["buttons-sub-container"]}>
                <CustomButton
                  text={"Regenerate"}
                  type={ButtonType.Regenerate}
                  onClick={handleRegenerate}
                />
                <CustomButton
                  text={t("newManager.approved")}
                  type={ButtonType.Approve}
                  onClick={handleApprove}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxCard;
