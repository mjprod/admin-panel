import React from "react";
import style from "./ConversationCard.module.css";
import Language from "./language/Language";
import Badge from "./Badge";

interface ConversationCardProps {
  category: string;
  progress: string;
  title: string;
  date: string;
  time: string;
  lang: string;
}

const ConversationCard: React.FC<ConversationCardProps> = ({
  category,
  progress,
  title,
  date,
  time,
  lang,
}) => {
  return (
    <div className={style["conversation-card"]}>
      <div className={style["row01"]}>
        <Badge text={category}/>
        <p>{progress}</p>
      </div>
      <div className={style["row02"]}>
        <p>{title}</p>
      </div>
      <div className={style["row03"]}>
        <p>Excerpt of the first 40 characters of question…</p>
      </div>
      <div className={style["row04"]}>
        <div className={style["date-time"]}>
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <Language lang={lang} />
      </div>
    </div>
  );
};

export default ConversationCard;
