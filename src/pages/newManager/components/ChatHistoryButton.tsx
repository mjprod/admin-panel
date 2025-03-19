import React, { useRef } from "react";
import styles from "./ChatHistoryButton.module.css";
import AssetsPack from "../../../util/AssetsPack";
import PopUpChatHistory from "../../../components/popUp/PopUpChatHistory";
import { KnowledgeContext } from "../../../api/responsePayload/KnowledgeResponse";

interface ChatHistoryButton {
  conversationData: KnowledgeContext
}

const ChatHistoryButton: React.FC<ChatHistoryButton> = ({
  conversationData
}) => {

  const modalRef = useRef<HTMLDialogElement | null>(null);
  
  const handleConvClicked = () => {
    modalRef.current?.showModal();
  };

  return (
    <>
        <div className={styles["question-chat-history"]}>
      <button className={styles["button-chat-history"]} onClick={handleConvClicked}>
        <img
          className={styles["iconChatHistory"]}
          src={AssetsPack.icons.ICON_CONVERSATION.default}
        />
        <p>Konteks Perbualan</p>
        <img
          className={styles["icon-chevDown"]}
          src={AssetsPack.icons.ICON_DROPDOWN.default}
        />
      </button>
      
    </div>
    <PopUpChatHistory modalRef={modalRef} conversationData={conversationData} />
    </>

  );
};

export default ChatHistoryButton;
