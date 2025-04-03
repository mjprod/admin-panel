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
import {
  DeleteContext,
  GetContextAI,
  KowledgeContentBulkCreate,
} from "../../../../../api/apiCalls";
import QuestionAnswerCard from "./QuestionAnswerCard";
import { mapToKnowledgeContext } from "../../../../../api/util/responseMap";
import { useConversationsContext } from "../../../../../context/ConversationProvider";

interface MaxCard {
  context: ContextItem;
}

const MaxCard: React.FC<MaxCard> = ({ context }) => {
  const { t } = useTranslation();
  const { setUpdateContextList } = useConversationsContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [pairs, setPairs] = useState<EditablePair[]>([]);
  const [chatData, setChatData] = useState<KnowledgeContext>();
  const [conversationId, setConversationId] = useState<string>("");

  const handleReject = async () => {
    try {
      await DeleteContext(context.id);
      setUpdateContextList(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegenerate = () => {
    getAIResponse();
  };

  const handleApprove = async () => {
    try {
      await KowledgeContentBulkCreate(context.id, pairs);
      setUpdateContextList(true);
    } catch (e) {
      console.log(e);
    }
  };

  const updatePair = (index: number, updatedFields: Partial<EditablePair>) => {
    const updatedPairs = pairs.map((pair, i) =>
      i === index ? { ...pair, ...updatedFields } : pair
    );

    setPairs(updatedPairs);
  };

  const getAIResponse = async () => {
    try {
      setLoading(true);
      const res = await GetContextAI(context.id);
      const messages: string[] =
        res?.flatMap((item) => [item.question, item.answer]) ?? [];
      const chat = mapToKnowledgeContext(context.context, messages);
      setChatData(chat ?? undefined);
      const enhancedPairs = (res ?? []).map((item) => ({
        ...item,
        selected: true,
      }));
      setConversationId(chat?.conversationId ?? "");
      setPairs(enhancedPairs);
      setLoading(false);
    } catch (e) {
      console.log(e);
      const chat = mapToKnowledgeContext(context.context, []);
      setChatData(chat ?? undefined);
      setLoading(false);
    }
  };

  const handleQuestionAnswerChange = (
    index: number,
    question: string,
    answer: string
  ) => {
    updatePair(index, { question: question, answer: answer });
  };

  useEffect(() => {
    getAIResponse();
  }, [context]);

  useEffect(() => {}, [pairs]);

  return (
    <div className={styles["question-group-scroll-container"]}>
      <div className={styles["question-group-container"]}>
        <div className={styles["question-group-main"]}>
          <div className={styles["question-container"]}>
            <Metadata
              date={context.date_created}
              time={context.date_created}
              conversationId={conversationId + ".." + context.id}
            />

            <div className={styles["question-chat-history"]}>
              <ChatHistoryButton conversationData={chatData} />
            </div>
            {loading && (
              <div className={styles["spinner-container"]}>
                <div className={styles.spinner}></div>
              </div>
            )}
            {!loading &&
              pairs.map((pair, index) => (
                <QuestionAnswerCard
                  key={`${context.id}-${pair.id}`}
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
                  defaultChecked={pair.selected}
                  onCheckedChange={(val) =>
                    updatePair(index, { selected: val })
                  }
                  onQuestionAnswerChanged={(question: string, answer: string) =>
                    handleQuestionAnswerChange(index, question, answer)
                  }
                />
              ))}

            {!loading && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaxCard;
