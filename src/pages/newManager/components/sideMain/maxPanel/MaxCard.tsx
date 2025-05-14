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
import CardSelector, {
  SelectorType,
} from "../questionList/components/cardSelector/CardSelector";
import { showConsoleError } from "../../../../../util/ConsoleMessage";

interface MaxCard {
  context: ContextItem;
  onChecked: (
    checked: boolean,
    contextId: number,
    pairs: EditablePair[]
  ) => void;
}

const MaxCard: React.FC<MaxCard> = ({ context, onChecked }) => {
  const { t } = useTranslation();
  const { setContext, setUpdateContextList, setTotalCount } =
    useConversationsContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [pairs, setPairs] = useState<EditablePair[]>([]);
  const [chatData, setChatData] = useState<KnowledgeContext>();
  const [conversationId, setConversationId] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const handleReject = async () => {
    try {
      await DeleteContext(context.id);
      updateList();
    } catch (e) {
      showConsoleError(e);
    }
  };

  const handleRegenerate = () => {
    getAIResponse();
  };

  const updateList = () => {
    setTotalCount((prev) => prev - 1);
    setContext((prev) => {
      const data = prev.filter((item) => item.id !== context.id);
      if (data.length === 0) {
        setUpdateContextList(true);
      }
      return data;
    });
  };

  const handleApprove = async () => {
    try {
      await KowledgeContentBulkCreate({ [context.id]: pairs });
      updateList();
    } catch (e) {
      showConsoleError(e);
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
      showConsoleError(e);
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
    const chat = mapToKnowledgeContext(context.context, []);
    setChatData(chat ?? undefined);
  }, [context]);

  useEffect(() => {
    onChecked(checked, context.id, pairs);
  }, [pairs]);

  return (
    <div className={styles["question-group-scroll-container"]}>
      <div className={styles["question-group-container"]}>
        <div className={styles["question-group-main"]}>
          <div className={styles["question-container"]}>
            <CardSelector
              title={t("newManager.mark_to_save")}
              type={SelectorType.Write}
              checked={checked}
              onChecked={(checked) => {
                setChecked(checked);
                onChecked(checked, context.id, pairs);
              }}
            />
            <Metadata
              date={context.date_created}
              time={context.date_created}
              text={`ConversationId: ${conversationId} ContextId: ${context.id} `}
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
