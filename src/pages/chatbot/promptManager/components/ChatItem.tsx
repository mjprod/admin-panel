import React, { useState } from "react";
import styles from "./ChatItem.module.css";
import clsx from "clsx";
import { PromptDataModel } from "./History";
import { PostPrompt, PromptPatch } from "../../../../api/apiCalls";
import { getInstruction, utcToLocalDate, utcToLocalTime } from "../../../../util/ExtensionFunction";
import PromptModal from "../PromptModal";
import ConfirmationDialog from "../ConfirmationDialog";
import { showConsoleError, showConsoleMessage } from "../../../../util/ConsoleMessage";

interface ChatItemProps {
    chat: PromptDataModel;
    setAction: (isAction: boolean) => void
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, setAction }) => {
    const [expanded, setExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCreateNewDialogConfirm, setShowCreateNewDialogConfirm] = useState(false);
    const [promptValue, setPromptValue] = useState(chat.prompt);

    const applyApicall = async () => {
        try {
            const response = await PromptPatch(chat.id, undefined, undefined, true);
            showConsoleMessage("Prompt Patch Response:", response)
            setAction(true)
        } catch (error) {
            showConsoleError("Failed to patch data:", error);
        }
    };
    const handleApply = () => {
        applyApicall()
    }

    const handleEdit = () => {
        setIsModalOpen((prev) => !prev);

    }


    const handleUpdatePrompt = () => {
        setShowCreateNewDialogConfirm(true)
    }

    const handleCreatePrompt = async (newNodeName: string, newPromptValue: string) => {
        try {
            const response = await PostPrompt(newNodeName, newPromptValue);
            setAction(true)
            showConsoleMessage("PostPrompt Response:", response)
        } catch (error) {
            showConsoleError("Failed to PostPrompt data:", error);
        }
    }

    const handleCreateNewConfirmDialogButton = async () => {
        setShowCreateNewDialogConfirm(false)
        handleCreatePrompt(chat.node_name, promptValue)
        handleEdit()
    }

    return (
        <>
            <div className={styles.container}>
                <div>{`Date: ${utcToLocalDate(chat.last_updated)} ${utcToLocalTime(chat.last_updated)}`}</div>
                <div className={styles.card}>
                    <div className={clsx(styles.info, styles.codeBlock)}>
                        {expanded ? promptValue : `${promptValue.slice(0, 1000)}...`}
                    </div>
                    <div className={styles.actions}>
                        <button className={clsx(styles.button, styles.apply)} onClick={handleApply}>Apply</button>
                        <button className={clsx(styles.button, styles.edit)} onClick={handleEdit}>Edit</button>
                        <button className={clsx(styles.button, styles.expand)} onClick={() => setExpanded((prev) => !prev)}>   {expanded ? "Collapse" : "Expand"}</button>
                    </div>
                </div>
            </div>
            <PromptModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false) }}
                onSave={handleUpdatePrompt}
                title={chat.node_name}
                instruction={getInstruction(chat.node_name)}
            >
                <textarea
                    onChange={e => setPromptValue(e.target.value)}
                    value={promptValue}
                    className={styles.input}
                    rows={20}
                />
            </PromptModal>

            <ConfirmationDialog
                isOpen={showCreateNewDialogConfirm}
                title='Are you sure you want to update this prompt?'
                onCancel={() => {
                    setShowCreateNewDialogConfirm(false)
                }}
                onConfirm={handleCreateNewConfirmDialogButton} />
        </>
    );
};

export default ChatItem;