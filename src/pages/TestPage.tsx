import MyChatBot from "./chatbot/MyChatBot";

const TestPage = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh"
      }}
    >
      <MyChatBot chatWindowStyle={{
        height: "90dvh",
        width: "100%"
      }} />
    </div>
  );
};

export default TestPage;
