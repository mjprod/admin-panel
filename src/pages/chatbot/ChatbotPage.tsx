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
        }}
      >
        <PromptManager />
      </div>
      <div style={{ flex: "1", display: "flex", padding: "16px", margin: "0 auto", flexDirection: "column", gap: "16px" }}>
        <MyChatBot chatWindowStyle={{
          height: "90dvh",
          width: "100%"
        }} />
      </div>
    </div>
  );
};

export default ChatbotPage;
