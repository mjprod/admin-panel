import React, { useState } from 'react';
import styles from "./PromptCard.module.css"
import clsx from 'clsx';
import PromptModal from './PromptModal';
import ConfirmationDialog from './ConfirmationDialog';
import History from './components/History';
import { Prompt } from '../../../api/responsePayload/PromptResponse';

interface PromptCardProps {
    prompt: Prompt;
    onUpdate?: (
        id: number,
        updatedNodeName?: string,
        updatedPrompt?: string,
        updatedIsActive?: boolean,
        updatedIsDefault?: boolean
    ) => void
    instruction?: string;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onUpdate, instruction }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDialogConfirm, setShowDialogConfirm] = useState(false);
    const [showHistoryDialog, setShowHistoryDialog] = useState(false);

    const [promptValue, setPromptValue] = useState(prompt.prompt);

    const handleDefaultButton = () => {
        setShowDialogConfirm(prev => !prev)
    };

    const handleHistoryButton = () => {
        setShowHistoryDialog(prev => !prev)
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
                    <div className={clsx(styles.title)}>{prompt.node_name}</div>
                    <div className={styles.buttonsContainer}>
                        <button className={clsx(styles.button, styles.warning)} onClick={handleDefaultButton}>Default</button>
                        <button className={clsx(styles.button, styles.normal)} onClick={handleHistoryButton}>History</button>
                        <button className={clsx(styles.button, styles.primary)} onClick={handleEditButton}>Edit</button>
                    </div>
                </div>
                <div className={styles.content}>
                    {prompt.prompt}
                </div>
            </div>
            <PromptModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false) }}
                onSave={() => { onUpdate && onUpdate(prompt.id, undefined, promptValue, undefined, prompt.is_default) }}
                title={prompt.node_name}
                instruction={instruction}>
                <textarea
                    onChange={e => setPromptValue(e.target.value)}
                    value={promptValue}
                    className={styles.input}
                    rows={20}
                />
            </PromptModal>
            <PromptModal
                isOpen={showHistoryDialog}
                onClose={() => { setShowHistoryDialog(false) }}
                onSave={() => { }}
                isAction= {false}
                title={`${prompt.node_name} Node History`} >
                <History nodeName={prompt.node_name} />
            </PromptModal>
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