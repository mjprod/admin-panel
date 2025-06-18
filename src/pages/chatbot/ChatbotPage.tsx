import MyChatBot from "./MyChatBot";
import PromptManager from "./promptManager/PromptManager";


const ChatbotPage = () => {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "sans-serif",
      }}>
      <PromptManager />
      <div style={{ padding: "16px", backgroundColor: "red" }}>
        <MyChatBot chatWindowStyle={{
          height: "90dvh",
        }} />
      </div>
    </div>
  );
};

export default ChatbotPage;
