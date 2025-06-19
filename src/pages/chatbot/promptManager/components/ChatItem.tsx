import React, { useState } from "react";
import styles from "./ChatItem.module.css";
import clsx from "clsx";

interface ChatItemProps {
    chat: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={styles.card}>

            <div className={styles.info}>
                {expanded ? chat : `${chat.slice(0, 50)}...`}
            </div>
            <div className={styles.actions}>
                <button className={clsx(styles.button, styles.apply)} >Apply</button>
                <button className={clsx(styles.button, styles.edit)} >Edit</button>
                <button className={clsx(styles.button, styles.expand)} onClick={() => setExpanded((prev) => !prev)}>   {expanded ? "Collapse" : "Expand"}</button>



            </div>
        </div>
    );
};

export default ChatItem;