import React from "react";
import styles from "./PopUpChatHistory.module.css";
import AssetsPack from "../../util/AssetsPack";
import PopUpChatHistoryDetail from "./PopUpChatHistoryDetail";
import ChatDialog, { ChatDialogProps, ChatType } from "./ChatDialog";

interface PopUpChatHistory {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

const PopUpChatHistory: React.FC<PopUpChatHistory> = ({ modalRef }) => {
  const data: ChatDialogProps[] = [
    {
      type: ChatType.CustomerSupport,
      datetime: "2025-03-17 08:04:50",
      message: "Hello, bagaimana saya boleh membantu anda hari ini?",
    },
    {
        type: ChatType.User,
        datetime: "2025-03-17 08:04:50",
        message: "morning..smlm sy out rm5400..hilang dr kiss"
    },
    {
        type: ChatType.User,
        datetime: "2025-03-17 08:09:14",
        message: "x dpt out dr kiss"
    },
    {
        type: ChatType.CustomerSupport,
        datetime: "2025-03-17 08:10:10",
        message: "boss dalam kiss masih ada credit?"
    },
    {
        type: ChatType.User,
        datetime: "2025-03-17 08:04:50",
        message: "morning..smlm sy out rm5400..hilang dr kiss",
        isActive: true
    },
    {
        type: ChatType.CustomerSupport,
        datetime: "2025-03-17 08:10:10",
        message: "bank maintenance..minta boss 1230pm tekan withdraw semula ya",
        isActive: true
    },
    {
        type: ChatType.User,
        datetime: "2025-03-17 08:09:14",
        message: "ok tq"
    },
    {
        type: ChatType.CustomerSupport,
        datetime: "2025-03-17 08:10:10",
        message: "ong2 boss"
    },
  ];
  return (
    <dialog className={styles["chat-conversation-modal"]} ref={modalRef}>
      <PopUpChatHistoryDetail
        modalRef={modalRef}
        conversationId={"1111"}
        datetime={"1111"}
      />

      <div className={styles["chat-conversation-modal-content-container"]}>
        <div className={styles["chat-conversation-group"]}>
          {data.map((dialog) => {
            return (
              <ChatDialog
                type={dialog.type}
                datetime={dialog.datetime}
                message={dialog.message}
              />
            );
          })}
        </div>
        <div className={styles["chat-end-of-conversation"]}>
          <div className={styles["icon-chat-end"]}>
            <img
              className={styles["icon-chat-end-conversation"]}
              src={AssetsPack.icons.ICON_END_CONVERSATION.default}
            />
          </div>
          <p>Tamat perbualan</p>
        </div>
      </div>
    </dialog>
  );
};

export default PopUpChatHistory;
