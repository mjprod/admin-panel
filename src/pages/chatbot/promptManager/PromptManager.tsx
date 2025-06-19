import React, { useEffect, useState } from 'react';
import styles from "./PromptManager.module.css"
import PromptCard from './PromptCard';
import { GetPrompts, PromptPatch } from '../../../api/apiCalls';

interface PromptManagerProps {
}

const PromptManager: React.FC<PromptManagerProps> = ({ }) => {
    const [prompts, setPrompts] = useState<any[] | null>(null);



    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await GetPrompts(undefined, { node_name: "ocr, agent, generate", is_active: true })
                console.log("GetPrompt response:", response?.results);
                response?.results && setPrompts(response.results)
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchChat();
    }, []);

    const handleResetAll = () => {
        alert('Reset all prompts');
    };

    const handleUpdatePrompt = async (id: number, nodeName?: string, prompt?: string, isActive?: boolean, isDefault?: boolean) => {
        if (isDefault) {
            try {
                const response = await PromptPatch(id, nodeName, prompt, isActive);
                console.log("Prompt Patch Response:", response)
            } catch (error) {
                console.error("Failed to patch data:", error);
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.stepContainer}>
                {prompts ? (
                    prompts.map(prompt => (
                        <div className={styles.step}>
                            <div className={styles.circle}>{prompt.node_name}</div>
                        </div>
                    ))
                ) : (
                    <p>Loading prompts...</p>
                )}
            </div>
            <div className={styles.promptCardContainer}>
                {prompts ? (
                    prompts.map(prompt => (
                        <PromptCard key={prompt.id} prompt={prompt} onUpdate={handleUpdatePrompt} />
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