import React, { useState } from "react";
import styles from "./ChatItem.module.css";
import clsx from "clsx";
import { PromptDataModel } from "./History";
import { PromptPatch } from "../../../../api/apiCalls";
import { useAppDispatch } from "../../../../store/hooks";
import { updateConfirmationDialog } from "../../../../store/prompt.slice";

interface ChatItemProps {
    chat: PromptDataModel;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useAppDispatch()

    const applyApicall = async () => {
        if (!chat.is_default) {
            try {
                const response = await PromptPatch(chat.id, chat.node_name, chat.prompt, true);
                console.log("Prompt Patch Response:", response)
            } catch (error) {
                console.error("Failed to patch data:", error);
            }
        } else {
            // dispatch(updateConfirmationDialog(true))
            console.error("Default---");

            // setShowDialogConfirm(true)
        }
    };
    const handleApply = () => {
        applyApicall()
    }

    const handleEdit = () => {

    }



    return (
        <div className={styles.card}>

            <div className={styles.info}>
                {expanded ? chat.prompt : `${chat.prompt.slice(0, 1000)}...`}
            </div>
            <div className={styles.actions}>
                <button className={clsx(styles.button, styles.apply)} onClick={handleApply}>Apply</button>
                <button className={clsx(styles.button, styles.edit)} onClick={handleEdit}>Edit</button>
                <button className={clsx(styles.button, styles.expand)} onClick={() => setExpanded((prev) => !prev)}>   {expanded ? "Collapse" : "Expand"}</button>



            </div>
        </div>
    );
};

export default ChatItem;