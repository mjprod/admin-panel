
import React from "react";
import styles from './FaqCard.module.css'
import { SimilarKnowledge } from "../../api/responsePayload/KnowledgeResponse";

interface FaqCardProps {
    index: number;
    faq: SimilarKnowledge;
    onDelete: (id: number) => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ index, faq, onDelete }) => {
    const { question, answer } = extractQA(faq.retrieve_content)

    return (
        <div className={styles.card}>
            <div>{index}</div>
            <div className={styles.qa}>
                <div style={{ fontWeight: 600 }}>{question}</div>
                <div>{answer}</div>
            </div>
            <button className={styles.deleteBtn} onClick={() => onDelete(faq.knowledge_content_id)}>
                Delete
            </button>
        </div>
    );

    function extractQA(text: string) {
        const qaRegex = /question:\s*([\s\S]*?)(?=\s*answer:)\s*answer:\s*([\s\S]*)/i;
        const match = text.match(qaRegex);
        if (!match) return {
            question: "",
            answer: ""
        };;

        const [, rawQuestion, rawAnswer] = match;
        return {
            question: rawQuestion.trim(),
            answer: rawAnswer.trim()
        };
    }
}

export default FaqCard;