import React, { ReactNode, useEffect, useState } from 'react';
import styles from "./PromptModal.module.css"
import clsx from 'clsx';

interface PromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    onSave: (value?: string) => void;
    isAction?: boolean,
    instruction?: string;
}

const PromptModal: React.FC<PromptModalProps> = ({
    isOpen,
    onClose,
    title = 'Editing',
    children = '',
    onSave,
    isAction = true,
    instruction
}) => {
    const [isInstructionOpen, setIsInstructionOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);


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
                        <button className={styles.topRightButton} onClick={handleInstruction}>?</button>
                    </div>

                    <button onClick={onClose} className={styles.closeButton}>
                        ×
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
                {isAction && <div className={styles.modalFooter}>
                    <button onClick={onClose} className={clsx(styles.button, styles.warning)}>
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave();
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

            ><textarea
                    value={instruction}
                    className={styles.input}
                    rows={20}
                /></PromptModal>
        </div>
    );
};

export default PromptModal;