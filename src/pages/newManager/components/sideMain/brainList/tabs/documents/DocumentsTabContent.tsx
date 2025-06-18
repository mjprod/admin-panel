import React from 'react';
import styles from "./DocumentsTabContent.module.css"
import { useConversationsContext } from '../../../../../../../context/ConversationProvider';
import BrainCard from '../../BrainCard';

interface DocumentsTabContentProps {
}

const DocumentsTabContent: React.FC<DocumentsTabContentProps> = ({ }) => {
    const { brainList } = useConversationsContext();
    return (
        <div className={styles["question-group-scroll-container"]}>
            {
                brainList && brainList.map((brain) => (
                    <BrainCard key={brain.id} data={brain} />
                ))
            }
        </div >
    );
};

export default DocumentsTabContent;