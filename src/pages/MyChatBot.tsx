import { useState } from "react";
import ChatBot from "react-chatbotify";
import { Params } from "react-chatbotify/dist/types/Params";

const MyChatBot = () => {
    const [thread, setThread] = useState<string>("1")

    const changeThread = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 4; // or however long you want the thread ID
        let result = '';

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        console.log("thread", result);
        setThread(result);
        localStorage.removeItem("example_smart_conversation");
    }

    async function fetchData(message: string) {
        try {
            const response = await fetch('https://api-staging.mjproapps.com/api/rag-chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    thread_id: thread
                }),
            });
            const data = await response.json();
            console.log(data)
            return data.reply || "No title returned";
        } catch (error) {
            console.log("error", error)
            return `Oh no I don't know what to say! ${error}`;
        }
    }
    const flow = {
        start: {
            message: "Hey! How can I help you!",
            path: "loop"
        },
        loop: {
            message: async (param: Params) => {
                const result = await fetchData(param.userInput);
                return result;
            },
            path: "loop",
        }
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                width: "100%",
                height: "100%"
            }}>
            <ChatBot styles={{
                chatWindowStyle: {
                    width: "80vw",
                    height: "80vh",
                },
            }} key={thread} settings={{ general: { embedded: true }, chatHistory: { storageKey: "example_smart_conversation" } }} flow={flow} />
            <button className="rcb-bot-message" onClick={changeThread}>Refresh Thread</button>
        </div>
    );
};

export default MyChatBot
