// HistoryModalContent.tsx
import React from "react";
import "./HistoryModalContent.css";

interface ConversationItem {
  UserMsg?: string;
  AdminReply?: string;
}

interface ConversationItemChinese {
  UserMsg_cn?: string;
  AdminReply_cn?: string;
}

interface ConversationHistory {
  Malay: ConversationItem[];
  Chinese: ConversationItemChinese[];
}

interface HistoryModalContentProps {
  history: ConversationHistory;
}

const HistoryModalContent: React.FC<HistoryModalContentProps> = ({
  history,
}) => {
  return (
    <div className="history-container">
      <h2>马来语对话记录</h2>
      {history.Malay.length > 0 ? (
        <div className="conversation-container">
          {history.Malay.map((item, index) => (
            <React.Fragment key={index}>
              {item.UserMsg && (
                <div className="message user-message">
                  <div className="message-header">用户:</div>
                  <div className="message-body">{item.UserMsg}</div>
                </div>
              )}
              {item.AdminReply && (
                <div className="message admin-message">
                  <div className="message-header">管理员:</div>
                  <div className="message-body">{item.AdminReply}</div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p>未找到马来语对话记录。</p>
      )}

      <h2>中文对话记录</h2>
      {history.Chinese.length > 0 ? (
        <div className="conversation-container">
          {history.Chinese.map((item, index) => (
            <React.Fragment key={index}>
              {item.UserMsg_cn && (
                <div className="message user-message">
                  <div className="message-header">用户:</div>
                  <div className="message-body">{item.UserMsg_cn}</div>
                </div>
              )}
              {item.AdminReply_cn && (
                <div className="message admin-message">
                  <div className="message-header">管理员:</div>
                  <div className="message-body">{item.AdminReply_cn}</div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p>未找到中文对话记录。</p>
      )}
    </div>
  );
};

export default HistoryModalContent;
