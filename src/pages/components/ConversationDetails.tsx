import React from "react";
import styles from "./ConversationDetails.module.css";
import Badge from "../../components/Badge";
import Language from "../../components/language/Language";

interface ConversationDetailsProps {
  title: string;
  id: string;
  date: string;
  category: string[];
  lang?: string;
}

const ConversationDetails: React.FC<ConversationDetailsProps> = ({
  title,
  id,
  date,
  category,
  lang = "",
}) => {
  const getLanguageName = (code: string): string => {
    const languageMap: { [key: string]: string } = {
      EN: "English",
      MY: "Malay",
      CN: "Simplified Chinese",
      TW: "Traditional Chinese",
    };
    return languageMap[code] || "Unknown Language";
  };

  return (
    <aside className={styles["conversation-details"]}>
      <div className={styles["row01"]}>
        <p>{title}</p>
        {category.map((category, index) => (
          <Badge key={index} text={category} />
        ))}
      </div>
      <div className={styles["row02"]}>
        <div className={styles["leftcol"]}>
          <div>Conversation ID: {id}</div>
          <div className={styles["date-time"]}>
            <p>{date}</p>
            {/* <p>{conversation.time}</p> */}
          </div>
        </div>
        {lang && (
          <div className={styles["rightcol"]}>
            <Language lang={lang} />
            &nbsp;{getLanguageName(lang)}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ConversationDetails;
