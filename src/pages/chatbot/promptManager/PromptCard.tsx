import React, { useState } from 'react';
import styles from "./PromptCard.module.css"
import clsx from 'clsx';
import PromptModal from './PromptModal';
import ConfirmationDialog from './ConfirmationDialog';

interface PromptCardProps {
    title: string;
    content?: string;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDialogConfirm, setShowDialogConfirm] = useState(false);

    const handleDefaultButton = () => {
        setShowDialogConfirm(prev => !prev)
    };

    const handleHistoryButton = () => {
        setShowDialogConfirm(prev => !prev)
    };

    const handleEditButton = () => {
        setIsModalOpen((prev) => !prev);
    };

    const handleShowConfirmDialog = () => {
        setShowDialogConfirm(prev => !prev)
    }

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
            <PromptModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false) }}
                onSave={() => { }}
                title={title}
                initialValue={content} />
            <ConfirmationDialog
                title="Are you sure you want to set the prompt to default?"
                isOpen={showDialogConfirm}
                onCancel={() => { setShowDialogConfirm(false) }}
                onConfirm={handleShowConfirmDialog}
            />
        </>
    );
};

export default PromptCard;