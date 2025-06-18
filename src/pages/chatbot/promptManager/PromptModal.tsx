import React, { useState, useEffect } from 'react';
import styles from "./PromptModal.module.css"
import clsx from 'clsx';

interface PromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    initialValue?: string;
    onSave: (value: string) => void;
}

const PromptModal: React.FC<PromptModalProps> = ({
    isOpen,
    onClose,
    title = 'Editing',
    initialValue = '',
    onSave,
}) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue, isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div style={{ flex: 1, flexDirection: "row", display: "flex", gap: "16px" }}>
                        <h2>{title}</h2>
                        <button className={styles.promptInstructionsButton}>?</button>
                    </div>

                    <button onClick={onClose} className={styles.closeButton}>
                        ×
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <textarea
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        className={styles.input}
                        rows={20}
                    />
                </div>
                <div className={styles.modalFooter}>
                    <button onClick={onClose} className={clsx(styles.button, styles.warning)}>
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave(value);
                            onClose();
                        }}
                        className={clsx(styles.button, styles.primary)}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromptModal;