import React from "react";
import styles from "./PopUpChatHistory.module.css";
import AssetsPack from "../../../util/AssetsPack";
import PopUpChatHistoryDetail from "./PopUpChatHistoryDetail";
import ChatDialog from "./ChatDialog";
import { KnowledgeContext } from "../../../api/responsePayload/KnowledgeResponse";
import { useTranslation } from "react-i18next";

interface PopUpChatHistory {
  conversationData: KnowledgeContext;
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

const PopUpChatHistory: React.FC<PopUpChatHistory> = ({
  conversationData,
  modalRef,
}) => {
  const { t } = useTranslation();
  return (
    <dialog className={styles["chat-conversation-modal"]} ref={modalRef}>
      <div className={styles["container"]}>
        <PopUpChatHistoryDetail
          modalRef={modalRef}
          conversationId={conversationData.conversationId}
          datetime={conversationData.date_time}
        />

        <div className={styles["chat-conversation-modal-content-container"]}>
          <div className={styles["chat-conversation-group"]}>
            {conversationData.chat_data.map((dialog) => {
              return (
                <ChatDialog
                  key={dialog.id}
                  id={dialog.id}
                  type={dialog.type}
                  datetime={dialog.datetime}
                  message={dialog.message}
                  isActive={dialog.isActive}
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
            <p>{t("popUpChatHistory.end_conversation")}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default PopUpChatHistory;
