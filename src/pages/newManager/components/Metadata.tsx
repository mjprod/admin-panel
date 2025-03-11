import React from "react";
import styles from "./Metadata.module.css";
import { useTranslation } from "react-i18next";

const Metadata: React.FC<{
  date: string;
  time: string;
  conversationId: string;
}> = ({ date, time, conversationId }) => {

  const { t } = useTranslation();
  
  return (
  <div className={styles["question-metadata"]}>
    <p>
      {date} | {time}
    </p>
    <p>{t("newManager.conversation_id")} {conversationId}</p>
  </div>
);
}

export default Metadata;
