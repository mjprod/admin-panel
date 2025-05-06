import axios from "axios";
import { useEffect, useState } from "react";
import ChatBot from "react-chatbotify";
import { Params } from "react-chatbotify/dist/types/Params";
import { getBaseUri } from "../../api/contants";

const MyChatBot = () => {
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

    console.log("thread", result);
    setThread(result);
    localStorage.removeItem("example_smart_conversation");
  };

  useEffect(() => {
    changeThread();
  }, []);

  async function fetchData(message: string) {
    try {
        const response = await axios.post(
            `${getBaseUri()}/rag-chat/`,
            {
              message: message,
              thread_id: thread,
              member_id: "303",
              team_id: "10",
            },
            {
              headers: { "Content-Type": "application/json" },
              timeout: 300000,
            }
          );
    
        const data = response.data;
        console.log("data", data);
      return data;
    } catch (error) {
      console.log("error", error);
      return `Oh no I don't know what to say! ${error}`;
    }
  }
  const flow = {
    start: {
      message: "Hey! How can I help you!",
      path: "loop",
    },
    loop: {
      message: async (param: Params) => {
        const result = await fetchData(param.userInput);
        const reply = result.reply || "No title returned";
        const contexts = result.retrieved_context || [];

        if (contexts.length > 0) {
            const contextText = "📚 Retrieved Contexts:\n" + contexts.map((ctx: string, idx: number) => `${idx + 1}. ${ctx}`).join("\n");
            
            await param.injectMessage(contextText, "bot");
          }
      
          return reply;
      },
      path: "loop",
    },
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        width: "100%",
        height: "100%",
      }}
    >
      <ChatBot
        styles={{
          chatWindowStyle: {
            width: "80vw",
            height: "80vh",
          },
        }}
        key={thread}
        settings={{
          general: { embedded: true },
          chatHistory: { storageKey: "example_smart_conversation" },
        }}
        flow={flow}
      />
      <button className="rcb-bot-message" onClick={changeThread}>
        Refresh Thread
      </button>
    </div>
  );
};

export default MyChatBot;
