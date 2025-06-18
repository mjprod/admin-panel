import React from 'react';
import styles from "./TabBar.module.css"
import clsx from 'clsx';
import { useConversationsContext } from '../../context/ConversationProvider';
import { KnowledgeType } from '../../util/KnowledgeType';

interface TabBarProps {
}

const TabBar: React.FC<TabBarProps> = ({ }) => {
    const { knowledgeType, setKnowledgeType } = useConversationsContext();
    const handleTabClick = (type: KnowledgeType) => {
        setKnowledgeType(type)
    }
    return (
        <div className={styles["tab-bar"]}>
            <div className={styles["tab-button-group"]}>
                <button className={clsx(styles["tab-button"], knowledgeType === KnowledgeType.DOCUMENT && styles["active"])} onClick={() => { handleTabClick(KnowledgeType.DOCUMENT) }}>Documents</button>
                <button className={clsx(styles["tab-button"], knowledgeType === KnowledgeType.FAQ && styles["active"])} onClick={() => { handleTabClick(KnowledgeType.FAQ) }}>FAQs</button>
            </div>
        </div>
    );
};

export default TabBar;