import React from "react";
import styles from "./ConversationDetails.module.css";
import Badge from "../../components/Badge";
import Language from "../../components/language/Language";

const ConversationDetails = () => {
  return (
    <aside className={styles["conversation-details"]}>
      <div className={styles["row01"]}>
        <p>Conversation 01</p>
        <Badge text="Technical"/>
      </div>
      <div className={styles["row02"]}>
        <div className={styles["leftcol"]}>
          <div>Conversation ID: 12345789489s89asda</div>
          <div className={styles["date-time"]}>
            <p>15/2/2025</p>
            <p>12:24:01 pm</p>
          </div>
        </div>
        <div className={styles["rightcol"]}>
          <Language lang="EN"/>&nbsp;English
        </div>
      </div>
    </aside>
  );
};

export default ConversationDetails;
