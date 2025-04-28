import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatbotButton.module.css";

const ChatbotButton = () => {
  const navigate = useNavigate();

  const toggleChatbot = () => {
    navigate("/chatbot");
  };

  return (
      <button
      className={styles["chatbot-button"]}
        onClick={toggleChatbot}
      >
        💬
      </button>
  );
};

export default ChatbotButton;