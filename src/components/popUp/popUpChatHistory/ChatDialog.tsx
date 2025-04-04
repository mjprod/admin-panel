import React from "react";
import styles from "./ChatDialog.module.css";
import AssetsPack from "../../../util/AssetsPack";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export enum ChatType {
  User = "user",
  CustomerSupport = "agent",
  JokerBot = "robot",
}

export enum MessageType {
  Bad = "bad",
  Changed = "changed",
  Good = "good",
  Normal = "normal",
}

export interface ChatDialogProps {
  id: number;
  type: ChatType;
  datetime: string;
  message: string;
  isActive?: boolean;
  messageType?: MessageType;
  image?: string;
}

const ChatDialog: React.FC<ChatDialogProps> = ({
  type,
  datetime,
  message,
  isActive = false,
  messageType = MessageType.Normal,
  image
}) => {
  const { t } = useTranslation();

  const ICONS_MAP = {
    [ChatType.User]: AssetsPack.icons.ICON_CUSTOMER.default,
    [ChatType.CustomerSupport]: AssetsPack.icons.ICON_CUSTOMER_SUPPORT.default,
    [ChatType.JokerBot]: AssetsPack.icons.ICON_ROBOT.default,
  };

  const chatUserName = {
    [ChatType.User]: t("chatDialog.jokerUser"),
    [ChatType.CustomerSupport]: t("chatDialog.customer_service"),
    [ChatType.JokerBot]: t("chatDialog.jokerBot"),
  }

  return (
    <div
      className={clsx(
        styles["chat-row"],
        styles[`chat-${type}-row`],
        isActive && styles["active-question"]
      )}
    >
      <div className={styles[`chat-bubble`]}>
        <div className={styles["chat-bubble-date"]}>{datetime}</div>
        <div className={styles[`chat-message`]}>
          <div className={styles[`chat-name-avatar`]}>
            <div className={styles[`chat-avatar`]}>
              <img className={styles["image"]} src={ICONS_MAP[type]} alt="" />
            </div>
            {chatUserName[type]}
          </div>
          <p className={styles[`${messageType}`]}>{message}</p>
          { image && <img className={styles["chat-image"]} src={image} alt="chat-image"/> }
        </div>
      </div>
    </div>
  );
};

export default ChatDialog;
