import React from "react";
import style from "./ConversationCard.module.css";
import Language from "../../../../components/language/Language";
import Badge from "../../../../components/badge/Badge";

interface ConversationCardProps {
  category: string[];
  progress: string;
  title: string;
  question: string;
  date: string;
  time?: string;
  lang?: string;
}

const ConversationCard: React.FC<ConversationCardProps> = ({
  category,
  progress,
  title,
  question,
  date,
  time = "",
  lang = "",
}) => {
  return (
    <div className={style["conversation-card"]}>
      <div className={style["row01"]}>
        {category.map((category, index) => (
          <Badge key={index} text={category} />
        ))}
        <p>{progress}</p>
      </div>
      <div className={style["row02"]}>
        <p>{title}</p>
      </div>
      <div className={style["row03"]}>
        <p>{question}</p>
      </div>
      <div className={style["row04"]}>
        <div className={style["date-time"]}>
          <p>{date}</p>
          <p>{time}</p>
        </div>
        {lang && <Language lang={lang} />}
      </div>
    </div>
  );
};

export default ConversationCard;
