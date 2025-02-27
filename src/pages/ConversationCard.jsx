import React from "react";
import PropTypes from "prop-types";

const ConversationCard = ({ category, progress, title, date, time, lang }) => {
  return (
    <div className="conversation-card">
      <div className="row01">
        <div className={`badge badge-color09`}>{category}</div>
        <p>{progress}</p>
      </div>
      <div className="row02">
        <p>{title}</p>
      </div>
      <div className="row03">
        <p>Excerpt of the first 40 characters of question…</p>
      </div>
      <div className="row04">
        <div className="date-time">
          <p>{date}</p>
          <p>{time}</p>
        </div>
        <div className="language-indicator">{lang}</div>
      </div>
    </div>
  );
};

ConversationCard.propTypes = {
  category: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
};

export default ConversationCard;
