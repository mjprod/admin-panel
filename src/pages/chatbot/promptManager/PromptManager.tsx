import React, { useEffect, useState } from 'react';
import styles from "./PromptManager.module.css"
import PromptCard from './PromptCard';
import { GetPrompts } from '../../../api/apiCalls';

interface PromptManagerProps {
}

const PromptManager: React.FC<PromptManagerProps> = ({ }) => {
    const [prompts, setPrompts] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await GetPrompts(undefined, { node_name: "ocr, agent, generate" })
                console.log("RagChat response:", response?.results);
                response?.results && setPrompts(response.results)
            } catch (error) {
                console.error("Failed to fetch chat data:", error);
            }
        };
        fetchChat();
    }, []);
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
                {prompts ? (
                    prompts.map(prompt => (
                        <PromptCard key={prompt.id} title={prompt.node_name} content={prompt.prompt} />
                    ))
                ) : (
                    <p>Loading prompts...</p>
                )}
            </div>
            <div className={styles.bottomContainer}>
                <button className={styles.resetButton} onClick={handleResetAll}>Revert all to Default</button>
            </div>
        </div>
    );
};

export default PromptManager;