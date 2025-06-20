import React, { useEffect, useState } from 'react';
import styles from "./PromptManager.module.css"
import PromptCard from './PromptCard';
import { GetPrompts, PostPrompt, PromptResetToDefault } from '../../../api/apiCalls';
import { getInstruction } from '../../../util/ExtensionFunction';
import ConfirmationDialog from './ConfirmationDialog';
import AssetsPack from '../../../util/AssetsPack';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';

interface PromptManagerProps {
}

const PromptManager: React.FC<PromptManagerProps> = ({ }) => {
    const navigate = useNavigate()
    const [prompts, setPrompts] = useState<any[] | null>(null);
    const [showResetAllToDefaultDialog, setShowResetAllToDefaultDialog] = useState(false);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await GetPrompts(undefined, { node_name: "ocr, agent, generate", is_active: true })
                console.log("GetPrompt response:", response?.results);
                response?.results && setPrompts(response.results)
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
            setRefresh(false)
        };
        if (refresh)
            fetchChat();
    }, [refresh]);

    const handleResetAllApiCall = async () => {
        try {
            const response = await PromptResetToDefault(["ocr, agent, generate"]);
            console.log("PostPrompt Response:", response)
        } catch (error) {
            console.error("Failed to PostPrompt data:", error);
        }
        setRefresh(true)
    }

    const handleResetAll = async () => {
        setShowResetAllToDefaultDialog(true)
    };

    const handleCreatePrompt = async (newNodeName: string, newPromptValue: string) => {
        try {
            const response = await PostPrompt(newNodeName, newPromptValue);
            console.log("PostPrompt Response:", response)
        } catch (error) {
            console.error("Failed to PostPrompt data:", error);
        }
        setRefresh(true)
    }

    const handleResetToDefault = async (nodeName: string) => {
        try {
            const response = await PromptResetToDefault([nodeName]);
            console.log("PostPrompt Response:", response)
        } catch (error) {
            console.error("Failed to PostPrompt data:", error);
        }
        setRefresh(true)
    }

    const handleBackButtonPress = () => {
        navigate(-1)
    }

    return (
        <div className={styles.container}>
            <div className={styles.bottomContainer}>
                <div className={styles.backButtonContainer} onClick={handleBackButtonPress}>
                    <img src={AssetsPack.icons.ICON_BACK.default} className={styles.back} /> Go Back
                </div>
                <button className={styles.resetButton} onClick={handleResetAll}>Revert all to Default</button>
            </div>
            <div className={styles.topContainer}>


                <div className={styles.stepContainer}>
                    {prompts ? (
                        prompts.map(prompt => (
                            <div className={styles.step} key={prompt.id}>
                                <div className={styles.circle}>{prompt.node_name}</div>
                            </div>
                        ))
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
                <div className={styles.promptCardContainer}>
                    {prompts ? (
                        prompts.map(prompt => (
                            <PromptCard
                                key={prompt.id}
                                prompt={prompt}
                                instruction={getInstruction(prompt.node_name)}
                                onCreate={handleCreatePrompt}
                                resetToDefault={handleResetToDefault}
                                setRefresh={setRefresh} />
                        ))
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
            </div>

            <ConfirmationDialog
                title='Are you sure you want to reset all nodes to default?'
                isOpen={showResetAllToDefaultDialog}
                onCancel={() => { setShowResetAllToDefaultDialog(false) }}
                onConfirm={handleResetAllApiCall} />
        </div>
    );
};

export default PromptManager;