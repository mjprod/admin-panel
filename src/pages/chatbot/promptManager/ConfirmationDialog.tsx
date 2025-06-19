import React from 'react';
import styles from "./ConfirmationDialog.module.css"
import clsx from 'clsx';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    title?: string;
    onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    onCancel,
    title = 'Editing',
    onConfirm,
}) => {

    if (!isOpen)
        return null

    return isOpen && <div className={styles["overlay"]} onClick={onCancel}>
        <div className={styles["container"]}>
            <div className={styles["content"]}>
                <div className={styles["text"]}>{title}</div>
            </div>
            <div className={styles["buttons-container"]}>
                <button className={clsx(styles["button"], styles["cancel"])} onClick={onCancel}>Cancel</button>
                <button className={clsx(styles["button"], styles["confirm"])} onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    </div>;
};

export default ConfirmationDialog;