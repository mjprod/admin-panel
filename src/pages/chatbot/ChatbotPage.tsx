import MyChatBot from "./MyChatBot";
import PromptManager from "./promptManager/PromptManager";


const ChatbotPage = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100dvh", 
        fontFamily: "sans-serif",
        overflow: "hidden",
      }}>
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "16px",
        }}
      >
        <PromptManager />
      </div>
      <div style={{ width: "40%", padding: "16px" }}>
        <MyChatBot chatWindowStyle={{
          height: "90vh",
          width: "90%"
        }} />
      </div>
    </div>
  );
};

export default ChatbotPage;
