import React from "react";
import styles from "./Metadata.module.css";

const Metadata: React.FC<{
  date: string;
  time: string;
  conversationId: string;
}> = ({ date, time, conversationId }) => (
  <div className={styles["question-metadata"]}>
    <p>
      {date} | {time}
    </p>
    <p>Conversation ID: {conversationId}</p>
  </div>
);

export default Metadata;
