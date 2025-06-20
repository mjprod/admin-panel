import React, { useEffect, useState } from 'react';
import styles from "./PromptManager.module.css"
import PromptCard from './PromptCard';
import { GetPrompts, PostPrompt, PromptResetToDefault } from '../../../api/apiCalls';
import ConfirmationDialog from './ConfirmationDialog';
import AssetsPack from '../../../util/AssetsPack';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import { Prompt } from '../../../api/responsePayload/PromptResponse';
import { showConsoleError, showConsoleMessage } from '../../../util/ConsoleMessage';
import { clarify_or_rewrite_question, generateInstructions, ocrInstructions } from './components/Instructions';

export const NODE_ORDER = ["ocr", "clarify_or_rewrite_question", "generate"];
export const NODE_DISPLAY_NAMES: { [key: string]: string } = {
    clarify_or_rewrite_question: 'Clarify or Rewrite Question',
    ocr: 'OCR',
    generate: 'Generate',
};
export const NODES_TO_FETCH = "clarify_or_rewrite_question, ocr, generate"

export const NODE_INSTRUCTIONS: { [key: string]: string } = {
    clarify_or_rewrite_question: clarify_or_rewrite_question,
    ocr: ocrInstructions,
    generate: generateInstructions
}

interface PromptManagerProps {
}

const PromptManager: React.FC<PromptManagerProps> = ({ }) => {
    const navigate = useNavigate()
    const [prompts, setPrompts] = useState<Prompt[] | null>(null);
    const [showResetAllToDefaultDialog, setShowResetAllToDefaultDialog] = useState(false);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await GetPrompts(undefined, { node_name: NODES_TO_FETCH, is_active: true })
                showConsoleMessage("GetPrompt response:", response?.results);
                response?.results && setPrompts(response.results.sort((a, b) => {
                    return NODE_ORDER.indexOf(a.node_name) - NODE_ORDER.indexOf(b.node_name);
                }))
            } catch (error) {
                showConsoleError("Failed to fetch data:", error);
            }
            setRefresh(false)
        };
        if (refresh)
            fetchChat();
    }, [refresh]);

    const handleResetAllApiCall = async () => {
        try {
            const response = await PromptResetToDefault([NODES_TO_FETCH]);
            showConsoleMessage("PostPrompt Response:", response)
        } catch (error) {
            showConsoleError("Failed to PostPrompt data:", error);
        }
        setRefresh(true)
    }

    const handleResetAll = async () => {
        setShowResetAllToDefaultDialog(true)
    };

    const handleCreatePrompt = async (newNodeName: string, newPromptValue: string) => {
        try {
            const response = await PostPrompt(newNodeName, newPromptValue);
            showConsoleMessage("PostPrompt Response:", response)
        } catch (error) {
            showConsoleError("Failed to PostPrompt data:", error);
        }
        setRefresh(true)
    }

    const handleResetToDefault = async (nodeName: string) => {
        try {
            const response = await PromptResetToDefault([nodeName]);
            showConsoleMessage("PostPrompt Response:", response)
        } catch (error) {
            showConsoleError("Failed to PostPrompt data:", error);
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
                                <div className={styles.circle}>{NODE_DISPLAY_NAMES[prompt.node_name] || prompt.node_name}</div>
                            </div>
                        ))
                    ) : (
                        <LoadingSpinner />
                    )}
                </div>
                <div className={styles.promptCardContainer}>
                    {prompts ? (
                        prompts.map(prompt => {
                            return <PromptCard
                                key={prompt.id}
                                prompt={prompt}
                                instruction={NODE_INSTRUCTIONS[prompt.node_name]}
                                onCreate={handleCreatePrompt}
                                resetToDefault={handleResetToDefault}
                                setRefresh={setRefresh} />
                        })
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