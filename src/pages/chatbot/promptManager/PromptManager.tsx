import React, { useEffect, useState } from 'react';
import styles from "./PromptManager.module.css"
import PromptCard from './PromptCard';
import { GetPrompts, PostPrompt } from '../../../api/apiCalls';
import { agentInstructions, generateInstructions, ocrInstructions } from './components/Instructions';

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
    const getInstruction = (node_name: string) => {

        return (node_name == "ocr") ? ocrInstructions : (node_name == "agent") ? agentInstructions : generateInstructions

    }

    const handleCreatePrompt = async (newNodeName: string, newPromptValue: string) => {
        try {
            const response = await PostPrompt(newNodeName, newPromptValue);
            console.log("PostPrompt Response:", response)
        } catch (error) {
            console.error("Failed to PostPrompt data:", error);
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
                        <PromptCard key={prompt.id} prompt={prompt} instruction={getInstruction(prompt.node_name)} onCreate={handleCreatePrompt} />
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