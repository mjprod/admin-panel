import React, { useRef } from "react";
import styles from "./ChatHistoryButton.module.css";
import { useTranslation } from "react-i18next";
import { KnowledgeContext } from "../../../../../../../api/responsePayload/KnowledgeResponse";
import PopUpChatHistory from "../../../../../../../components/popUp/popUpChatHistory/PopUpChatHistory";
import AssetsPack from "../../../../../../../util/AssetsPack";

interface ChatHistoryButton {
  conversationData: KnowledgeContext;
}

const ChatHistoryButton: React.FC<ChatHistoryButton> = ({
  conversationData,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleConvClicked = () => {
    modalRef.current?.showModal();
  };

  const { t } = useTranslation();

  return (
    <>
      <div className={styles["question-chat-history"]}>
        <button
          className={styles["button-chat-history"]}
          onClick={handleConvClicked}
        >
          <img
            className={styles["iconChatHistory"]}
            src={AssetsPack.icons.ICON_CONVERSATION.default}
          />
          <p>{t("chatHistoryButton.conversation_context")}</p>
          <img
            className={styles["icon-chevDown"]}
            src={AssetsPack.icons.ICON_DROPDOWN.default}
          />
        </button>
      </div>
      <PopUpChatHistory
        modalRef={modalRef}
        conversationData={conversationData}
      />
    </>
  );
};

export default ChatHistoryButton;
