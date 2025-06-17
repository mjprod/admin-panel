import React from 'react';
import styles from "./PromptCard.module.css"
import clsx from 'clsx';

interface PromptCardProps {
    title: string;

}

const PromptCard: React.FC<PromptCardProps> = ({ title }) => {
    const handleDefaultButton = () => {
        alert('Default action for ' + title);
    };
    const handleHistoryButton = () => {
        alert('History action for ' + title);
    };
    const handleEditButton = () => {
        alert('Edit action for ' + title);
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={clsx(styles.title)}>{title}</div>
                <div className={styles.buttonsContainer}>
                    <button className={clsx(styles.button, styles.warning)} onClick={handleDefaultButton}>Default</button>
                    <button className={clsx(styles.button, styles.normal)} onClick={handleHistoryButton}>History</button>
                    <button className={clsx(styles.button, styles.primary)} onClick={handleEditButton}>Edit</button>
                </div>
            </div>
            <div className={styles.content}>
                Content
            </div>
        </div>
    );
};

export default PromptCard;