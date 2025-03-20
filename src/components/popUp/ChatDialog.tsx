import React from "react";
import styles from "./ChatDialog.module.css";
import AssetsPack from "../../util/AssetsPack";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export enum ChatType {
  User = "user",
  CustomerSupport = "agent",
}

export interface ChatDialogProps {
  id: number;
  type: ChatType;
  datetime: string;
  message: string;
  isActive?: boolean;
}

const ChatDialog: React.FC<ChatDialogProps> = ({
  type,
  datetime,
  message,
  isActive = false,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        styles[`chat-${type}-row`],
        isActive && styles["active-question"]
      )}
    >
      <div className={styles[`chat-${type}-bubble`]}>
        <div className={styles["chat-bubble-date"]}>{datetime}</div>
        <div className={styles[`chat-${type}-message`]}>
          <div className={styles[`chat-${type}-name-avatar`]}>
            <div className={styles[`chat-${type}-avatar`]}>
              <img
                src={
                  type == ChatType.User
                    ? AssetsPack.icons.ICON_CUSTOMER.default
                    : AssetsPack.icons.ICON_CUSTOMER_SUPPORT.default
                }
                alt=""
              />
            </div>
            {type == ChatType.User
              ? t("chatDialog.jokerUser")
              : t("chatDialog.customer_service")}
          </div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatDialog;
