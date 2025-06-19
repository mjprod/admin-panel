import React, { useState } from "react";
import styles from './History.module.css'
import ChatItem from "./ChatItem";
import clsx from "clsx";
// import AssetsPack from "../../../../util/AssetsPack";

const History = () => {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const chatData = [
        {
            id: 1,
            chat: "This is a sample history prompt",
            date: "2025-06-15",
        },
        {
            id: 2,
            chat: "This is a sample history prompt",
            date: "2025-06-16",
        },
    ];

    const filteredChats = chatData.filter((item) => {
        if (!startDate && !endDate) return true;
        const itemDate = new Date(item.date).getTime();
        const from = startDate ? new Date(startDate).getTime() : -Infinity;
        const to = endDate ? new Date(endDate).getTime() : Infinity;
        return itemDate >= from && itemDate <= to;
    });

    return (
        <div className={styles.container}>
            {/* <img src={AssetsPack.icons.ICON_BACK.default} className={styles.back} /> */}
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
            <div>
                Today
            </div>
            <div className={styles.chatList}>
                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                        <ChatItem key={chat.id} chat={chat.chat} />
                    ))
                ) : (
                    <div>No chats found for the selected date range.</div>
                )}
            </div>
        </div>
    );

}

export default History;