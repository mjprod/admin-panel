import React, { useEffect, useState } from "react";
import styles from "./ContextCard.module.css";
import Metadata from "../questionList/components/metaData/Metadata";
import CustomButton, {
  ButtonType,
} from "../../../../../components/button/CustomButton";
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
import AssetsPack from "../../../../../util/AssetsPack";
import { updateContextSelection } from "../../../../../store/context.slice";
import clsx from "clsx";
/* eslint-disable complexity */

interface ContextCard {
  context: ContextItem;
  onChecked: (
    checked: boolean,
    contextId: number,
    pairs: EditablePair[]
  ) => void;
  checked: boolean,
  setChecked: () => void
}

const ContextCard: React.FC<ContextCard> = ({ context, onChecked, checked, setChecked }) => {
  const dispatch = useAppDispatch();
  const totalCount = useSelector(
    (state: RootState) => state.pagination.totalCount
  );
  const { setContext, setUpdateContextList } = useConversationsContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [pairs, setPairs] = useState<EditablePair[]>([]);
  const [chatData, setChatData] = useState<KnowledgeContext>();
  const [conversationId, setConversationId] = useState<string>("");
  const [isAIGenerateView, setAIGenerateView] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBack = () => {
    setAIGenerateView(false)
  }

  const handleReject = async () => {
    try {
      await DeleteContext(context.id);
      updateList();

    } catch (e) {
      showConsoleError(e);
    }
  };

  const handleRegenerate = () => {
    if (isAIGenerateView || pairs.length <= 0) {
      getAIResponse();
    }
    setAIGenerateView(true);
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
    dispatch(updateContextSelection(false));

  };

  const handleApprove = async () => {
    try {

      await KowledgeContentBulkCreate({ [context.id]: pairs });
      updateList();

    } catch (e) {
      showConsoleError(e);
    }
  };

  const updatePair = (index: number, updatedFields: Partial<EditablePair>, removePair?: EditablePair) => {
    const updatedPairs = pairs.map((pair, i) =>
      i === index ? { ...pair, ...updatedFields } : pair
    );

    const finalPairs = removePair
      ? updatedPairs.filter(pair => pair.id !== removePair.id)
      : updatedPairs;

    setPairs(finalPairs);


    setAIGenerateView(finalPairs.length > 0)
    if (finalPairs.length <= 0) {
      updateList()
    }
  };

  const getAIResponse = async () => {
    try {
      setLoading(true);
      const res = await GetContextAI(context.id);

      const chat = mapToKnowledgeContext(context.context);
      setChatData(chat ?? undefined);
      const enhancedPairs = (res ?? []).map((item) => ({
        ...item,
        selected: false,
      }));
      setConversationId(chat?.conversationId ?? "");
      setPairs(enhancedPairs);
      setLoading(false);
    } catch (e) {
      showConsoleError(e);
      const chat = mapToKnowledgeContext(context.context);
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
    const chat = mapToKnowledgeContext(context.context);
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
            <div className={styles["top-container"]}>
              <CardSelector
                title={checked ? "On Progress" : "Review this chat"}
                type={SelectorType.Write}
                checked={checked}
                onChecked={(checked) => {
                  setChecked();
                  onChecked(checked, context.id, pairs);
                }}
              />
              {checked && <img className={styles["icon-reject"]} src={AssetsPack.icons.ICON_DELETE.default} onClick={handleReject} />}
            </div>
            <Metadata
              date={context.date_created}
              time={context.date_created}
              text={`ConversationId: ${conversationId} ContextId: ${context.id} `}
            />
            <button
              className={styles["expand-toggle"]}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse View" : "Expand View"}
            </button>

            {!isAIGenerateView && <div className={clsx(styles["chat-conversation-group"], isExpanded && styles['expand'])}>
              {chatData?.chat_data.map((dialog, index) => {
                return <ChatDialog key={index} {...dialog} />;
              })}
            </div>}
            {isAIGenerateView &&
              <div className={clsx(styles["chat-conversation-group"], isExpanded && styles['expand'])}>
                <AIGenerateList
                  loading={loading}
                  contextId={context.id}
                  pairs={pairs}
                  onUpdatePair={updatePair}
                  onQuestionAnswerChange={handleQuestionAnswerChange}
                />
              </div>
            }

            {!loading && (
              <div className={styles["buttons-container"]}>
                {/* <CustomButton
                  text={t("newManager.reject")}
                  type={ButtonType.Reject}
                  onClick={handleReject}
                /> */}
                {isAIGenerateView && <CustomButton
                  text={"Back To Context"}
                  type={ButtonType.Return}
                  onClick={handleBack}
                  disabled={!checked}

                />}
                <div className={styles["buttons-sub-container"]}>
                  <CustomButton
                    text={!isAIGenerateView ? "Generate Q&A" : "Regenerate Q&A"}
                    type={ButtonType.Regenerate}
                    onClick={handleRegenerate}
                    disabled={!checked}
                  />
                  <CustomButton
                    text={"Finish"}
                    type={ButtonType.Approve}
                    onClick={handleApprove}
                    disabled={!checked || (isAIGenerateView && !pairs.some(it => it.selected))}

                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ContextCard;
