/* eslint-disable react/prop-types */
import { CSSProperties, useEffect, useState } from "react";
import ChatBot, { Button } from "react-chatbotify";
import { Params } from "react-chatbotify/dist/types/Params";
import { RagChat } from "../../api/apiCalls";
import { ChatbotResponse } from "../../api/responsePayload/ChatbotResponse";
import { ragMemberSecretKey } from "../../api/contants";
import CustomButton, { ButtonType } from "../../components/button/CustomButton";

interface MyChatBotProps {
  chatWindowStyle: CSSProperties;
}

const MyChatBot: React.FC<MyChatBotProps> = ({ chatWindowStyle }) => {
  const [thread, setThread] = useState<string>("1");

  const changeThread = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 4; // or however long you want the thread ID
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setThread(result);
    localStorage.removeItem("example_smart_conversation");
  };

  useEffect(() => {
    changeThread();
  }, []);

  async function fetchData(message: string): Promise<ChatbotResponse | null> {
    const response = await RagChat(message, thread, "303", "10", ragMemberSecretKey);
    return response;
  }

  const flow = {
    start: {
      message: "Hey! How can I help you!",
      path: "loop",
    },
    loop: {
      message: async (param: Params) => {
        const result = await fetchData(param.userInput);
        const reply = result?.reply || "No title returned";
        const contexts = result?.retrieved_context || [];
        const nonEmptyContexts = contexts.filter(ctx => ctx && ctx.trim() !== "");
        if (nonEmptyContexts.length > 0) {
          const contextText =
            "📚 Retrieved Contexts:\n" +
            nonEmptyContexts
              .map((ctx: string, idx: number) => `${idx + 1}. ${ctx}`)
              .join("\n");

          await param.injectMessage(contextText, "bot");
        }

        return reply;
      },
      path: "loop",
    },
  };
  return (
    <>
      <ChatBot
        styles={{
          chatWindowStyle: chatWindowStyle,
        }}
        key={thread}
        settings={{
          general: { embedded: true },
          header: { title: "Joker Bot", buttons: [Button.CLOSE_CHAT_BUTTON] },
          chatHistory: { storageKey: "example_smart_conversation" },
        }}
        flow={flow}
      />
      <CustomButton type={ButtonType.Submit} text="Start New Chat" onClick={changeThread} />
    </>
  );
};

export default MyChatBot;
