import React from "react";
import styles from "./ConversationDetails.module.css";
import Badge from "../../components/Badge";
import Language from "../../components/language/Language";
import { Conversation } from "../../util/ExampleData";

interface ConversationDetailsProps {
  conversation: Conversation;
}

const ConversationDetails: React.FC<ConversationDetailsProps> = ({conversation}) => {

  const getLanguageName = (code: string): string => {
    const languageMap: { [key: string]: string } = {
      EN: "English",
      MY: "Malay",
      CN: "Simplified Chinese",
      TW: "Traditional Chinese"
    };
    return languageMap[code] || "Unknown Language";
  };

  return (
    <aside className={styles["conversation-details"]}>
      <div className={styles["row01"]}>
        <p>{conversation.title}</p>
        <Badge text={conversation.category}/>
      </div>
      <div className={styles["row02"]}>
        <div className={styles["leftcol"]}>
          <div>Conversation ID: {conversation.conversationId}</div>
          <div className={styles["date-time"]}>
            <p>{conversation.date}</p>
            <p>{conversation.time}</p>
          </div>
        </div>
        <div className={styles["rightcol"]}>
          <Language lang={conversation.lang}/>&nbsp;{getLanguageName(conversation.lang)}
        </div>
      </div>
    </aside>
  );
};

export default ConversationDetails;
