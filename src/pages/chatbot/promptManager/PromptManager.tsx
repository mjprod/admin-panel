import React from 'react';
import styles from "./PromptManager.module.css"
import PromptCard from './PromptCard';

interface PromptManagerProps {
}

const PromptManager: React.FC<PromptManagerProps> = ({ }) => {
    const handleResetAll = () => {
        alert('Reset all prompts');
    };
    return (
        <div className={styles.container}>
            <div className={styles.stepContainer}>
                <div className={styles.step}>
                    <div className={styles.circle}>Agent</div>
                </div>
                <div className={styles.step}>
                    <div className={styles.circle}>OCR</div>
                </div>
                <div className={styles.step}>
                    <div className={styles.circle}>Generate</div>
                </div>
            </div>
            <div className={styles.promptCardContainer}>
                <PromptCard title="Agent" />
                <PromptCard title='OCR' />
                <PromptCard title='Generate' />
            </div>
            <div className={styles.bottomContainer}>
                <button className={styles.resetButton} onClick={handleResetAll}>Revert all to Default</button>
            </div>
        </div>
    );
};

export default PromptManager;