import React from "react";
import styles from "./PopUpChatHistoryDetail.module.css";
import AssetsPack from "../../../util/AssetsPack";
import { useTranslation } from "react-i18next";

interface PopUpChatHistoryDetail {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  conversationId: string;
  datetime: string
}

const PopUpChatHistoryDetail: React.FC<PopUpChatHistoryDetail> = ({
  modalRef,
  conversationId,
  datetime
}) => {

  const closeModal = () => {
    modalRef.current?.close();
  };

  const {t} = useTranslation()

  return (
    <div className={styles["chat-conversation-modal-details"]}>
      <div className={styles["row01"]}>
        <div className={styles["leftcol"]}>
          <div className={styles["ConversationTitle"]}>
            <h2>{t("popUpChatHistoryDetail.conversation_context")}</h2>
          </div>
        </div>
        <div className={styles["rightcol"]}>
          <button
            className={styles["closeConversationModal"]}
            onClick={closeModal}
          >
            <img className={styles["close-dialog-modal"]} src={AssetsPack.icons.ICON_CLOSE_GRAY.default} />
          </button>
        </div>
      </div>
      <div className={styles["row02"]}>
        <div className={styles["chat-user-avatar"]}>
          <img src={AssetsPack.icons.ICON_CUSTOMER.default} alt="" />
        </div>
        <h3>{t("popUpChatHistoryDetail.jokerUser")}</h3>
      </div>
      <div className={styles["row03"]}>
        <div className={styles["leftcol"]}>
          <div className={styles["question-metadata"]}>
            <p>
              <strong>{t("popUpChatHistoryDetail.conversation_id")}</strong> {conversationId}
            </p>
          </div>
        </div>
        <div className={styles["rightcol"]}>
          <div className={styles["question-metadata"]}>
            <p>{datetime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpChatHistoryDetail;
