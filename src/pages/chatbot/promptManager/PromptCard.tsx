import React, { useState } from 'react';
import styles from "./PromptCard.module.css"
import clsx from 'clsx';
import PromptModal from './PromptModal';

interface PromptCardProps {
    title: string;
    content?: string;

}

const PromptCard: React.FC<PromptCardProps> = ({ title, content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDefaultButton = () => {
        alert('Default action for ' + title);
    };
    const handleHistoryButton = () => {
        alert('History action for ' + title);
    };
    const handleEditButton = () => {
        setIsModalOpen((prev) => !prev);
    };
    return (
        <>
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
                    {content}
                </div>
            </div>
            <PromptModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }} onSave={() => { }} title={title} initialValue={content} />
        </>
    );
};

export default PromptCard;