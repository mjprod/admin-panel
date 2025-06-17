import React, { useEffect, useState } from "react";
import styles from "./ContextCard.module.css";
import Metadata from "../questionList/components/metaData/Metadata";
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
import { mapToKnowledgeContext } from "../../../../../api/util/responseMap";
import { useConversationsContext } from "../../../../../context/ConversationProvider";
import CardSelector, {
  SelectorType,
} from "../questionList/components/cardSelector/CardSelector";
import { showConsoleError } from "../../../../../util/ConsoleMessage";
import { useAppDispatch } from "../../../../../store/hooks";
import { setPagination } from "../../../../../store/pagination.slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import AIGenerateList from "./AIGenerateList";
import ChatDialog from "../../../../../components/popUp/popUpChatHistory/ChatDialog";

interface ContextCard {
  context: ContextItem;
  onChecked: (
    checked: boolean,
    contextId: number,
    pairs: EditablePair[]
  ) => void;
  checked: boolean,
  setChecked: ()=>void
}

const ContextCard: React.FC<ContextCard> = ({ context, onChecked , checked, setChecked}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const totalCount = useSelector(
    (state: RootState) => state.pagination.totalCount
  );
  const { setContext, setUpdateContextList } = useConversationsContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [pairs, setPairs] = useState<EditablePair[]>([]);
  const [chatData, setChatData] = useState<KnowledgeContext>();
  const [conversationId, setConversationId] = useState<string>("");

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
    dispatch(setPagination({ totalCount: totalCount - 1 }));
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
                setChecked();
                onChecked(checked, context.id, pairs);
              }}
            />
            <Metadata
              date={context.date_created}
              time={context.date_created}
              text={`ConversationId: ${conversationId} ContextId: ${context.id} `}
            />
            <div className={styles["chat-conversation-group"]}>
              {chatData?.chat_data.map((dialog, index) => {
                return <ChatDialog key={index} {...dialog} />;
              })}
            </div>
            <AIGenerateList
              loading={loading}
              contextId={context.id}
              pairs={pairs}
              onUpdatePair={updatePair}
              onQuestionAnswerChange={handleQuestionAnswerChange}
            />

            {!loading && checked && (
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

export default ContextCard;
