import React from 'react';
import styles from "./FAQsTabContent.module.css"
import { useConversationsContext } from '../../../../../../../context/ConversationProvider';
import BrainCard from '../../BrainCard';
import SearchBar from '../../../../../../../components/searchBar/SearchBar';

interface FAQsTabContentProps {
}

const FAQsTabContent: React.FC<FAQsTabContentProps> = ({ }) => {
    const { brainList } = useConversationsContext();
    return (
        <div>
            <SearchBar />
            <div className={styles["question-group-scroll-container"]}>
                {brainList && brainList.map((brain) => (
                    <BrainCard key={brain.id} data={brain} />
                ))}
            </div>
        </div>

    );
};

export default FAQsTabContent;