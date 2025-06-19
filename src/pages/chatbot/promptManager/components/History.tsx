import React, { useEffect, useState } from "react";
import styles from './History.module.css'
import ChatItem from "./ChatItem";
import clsx from "clsx";
import { GetPrompts } from "../../../../api/apiCalls";

interface HistoryProps {
    nodeName: string;
    setRefresh: (value: boolean) => void;
}

export interface PromptDataModel {
    date_created: string;
    id: number;
    is_active: boolean;
    is_default: boolean;
    last_updated: string;
    node_name: string;
    prompt: string;
}

const History: React.FC<HistoryProps> = ({ nodeName, setRefresh }) => {
    const [prompts, setPrompts] = useState<PromptDataModel[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isAction, setActionUpdate] = useState(true)

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await GetPrompts(undefined, { node_name: nodeName })
                response?.results && setPrompts(response.results.reverse())
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
            setActionUpdate(false)
        };

        if (isAction) {
            setRefresh(isAction)
            fetchChat();
        }
    }, [isAction])

    const filteredChats = prompts.filter((item) => {
        if (!startDate && !endDate) return true;
        const itemDate = new Date(item.last_updated).getTime();
        const from = startDate ? new Date(startDate).getTime() : -Infinity;
        const to = endDate ? new Date(endDate).getTime() : Infinity;
        return itemDate >= from && itemDate <= to;
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.dates_container}>
                    <label>Start Date:</label>
                    <input type="date" placeholder="dd/mm/yyyy" className={styles.date} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <label>-</label>
                    <label>End Date:</label>
                    <input type="date" value={endDate} placeholder="dd/mm/yyyy" className={styles.date} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <button className={clsx(styles.button)}> Search</button>

            </div>

            <div className={styles.chatList}>
                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                        <ChatItem key={chat.id} chat={chat} setAction={(isAction) => setActionUpdate(isAction)} />
                    ))
                ) : (
                    <div>No chats found for the selected date range.</div>
                )}
            </div>
        </div>
    );

}

export default History;