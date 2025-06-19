import React, { useState, useEffect } from 'react';
import styles from "./PromptModal.module.css"
import clsx from 'clsx';

interface PromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    initialValue?: string;
    onSave: (value: string) => void;
    isAction?: boolean,
    instruction?: string;

}

const PromptModal: React.FC<PromptModalProps> = ({
    isOpen,
    onClose,
    title = 'Editing',
    initialValue = '',
    onSave,
    isAction = true,
    instruction
}) => {
    const [value, setValue] = useState(initialValue);
    const [isInstructionOpen, setIsInstructionOpen] = useState(false);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue, isOpen]);


    const handleInstruction = () => {
        setIsInstructionOpen((prev) => !prev);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div style={{ flex: 1, flexDirection: "row", display: "flex", gap: "16px" }}>
                        <h2>{title}</h2>
                        <button className={styles.promptInstructionsButton} onClick={handleInstruction}>?</button>
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
                {isAction  && <div className={styles.modalFooter}>
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
                </div>}
            </div>

            <PromptModal
                isOpen={isInstructionOpen}
                onClose={() => { setIsInstructionOpen(false) }}
                onSave={() => { }}
                isAction={false}
                title={`${title} prompt instruction`}
                initialValue={instruction} />
        </div>
    );
};

export default PromptModal;