import React from "react";

const ConversationDetails = () => {
  return (
    <aside className="conversation-details">
      <div className="row01">
        <p>Conversation 01</p>
        <div className="badge badge-color09">Technical</div>
      </div>
      <div className="row02">
        <div className="leftcol">
          <div>Conversation ID: 12345789489s89asda</div>
          <div className="date-time">
            <p>15/2/2025</p>
            <p>12:24:01 pm</p>
          </div>
        </div>
        <div className="rightcol">
          <div className="language-indicator">EN</div>&nbsp;English
        </div>
      </div>
    </aside>
  );
};

export default ConversationDetails;
