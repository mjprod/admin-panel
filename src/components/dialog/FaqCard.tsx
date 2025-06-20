
import React from "react";
import styles from './FaqCard.module.css'

interface FaqCardProps {
    faq: {
        id: number
        question: string;
        answer: string;
    };
    onDelete: (id: number) => void;
}

const FaqCard: React.FC<FaqCardProps> = ({ faq, onDelete }) => {

    return (
        <div className={styles.card}>
            <div>[]]</div>
            <div className={styles.qa}>
                <div style={{ fontWeight: 600 }}>{faq.question}</div>
                <div>{faq.answer}</div>
            </div>
            <button className={styles.deleteBtn} onClick={() => onDelete(faq.id)}>
                Delete
            </button>
        </div>
    );
}

export default FaqCard;