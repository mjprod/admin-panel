import React, { ReactNode, useEffect } from 'react';
import styles from "./PromptModal.module.css"
import clsx from 'clsx';

interface PromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    onSave: (value?: string) => void;
}

const PromptModal: React.FC<PromptModalProps> = ({
    isOpen,
    onClose,
    title = 'Editing',
    children = '',
    onSave,
}) => {
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

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div style={{ flex: 1, flexDirection: "row", display: "flex", gap: "16px" }}>
                        <h2>{title}</h2>
                        <button className={styles.topRightButton}>?</button>
                    </div>

                    <button onClick={onClose} className={styles.closeButton}>
                        ×
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
                <div className={styles.modalFooter}>
                    <button onClick={onClose} className={clsx(styles.button, styles.warning)}>
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onSave();
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