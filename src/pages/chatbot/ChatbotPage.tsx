import MyChatBot from "./MyChatBot";
import PromptManager from "./promptManager/PromptManager";


const ChatbotPage = () => {
  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        fontFamily: "sans-serif"
      }}>
      <PromptManager />
      <div style={{ display: "flex", flex: "1", width: "100%", padding: "16px" }}>
        <MyChatBot chatWindowStyle={{
          height: "90dvh",
          width: "100%"
        }} />
      </div>
    </div>
  );
};

export default ChatbotPage;
