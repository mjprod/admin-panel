import { useState } from "react";
import styles from './SimilarFaq.module.css'
import FaqCard from "./FaqCard";
import WarningPanel from "./WarningPanel";
import { DialogShownFromType } from "./Dialog";
/* eslint-disable react/prop-types */

interface DeleteWarningPanelProps {
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteWarningPanel: React.FC<DeleteWarningPanelProps> = ({ onCancel, onConfirm }) => {
    return (
        <div className={styles.dangerBox}>
            <div className={styles.dangerInner}>
                <div className={styles.dangerTitle}>Warning!</div>
                <div style={{ color: "#666", marginBottom: "2rem" }}>
                    This action will directly affect the existing brain knowledge
                </div>
                <div className={styles.dangerActions}>
                    <button className={styles.cancel} onClick={onCancel}>
                        Cancel
                    </button>
                    <button className={styles.deleteBtn} onClick={onConfirm}>
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
}


interface SimilarFaqProps {
    dialogShownFromType: DialogShownFromType
    id: number;
    question: string;
    answer?: string;

}


const SimilarFaq: React.FC<SimilarFaqProps> = ({ id, question, answer, dialogShownFromType }) => {
    const [swapped, setSwapped] = useState(false);

    const [faqs, setFaqs] = useState([
        {
            id: 1,
            question: "Question 1 will be here",
            answer: "Answer will be here this is the stuff that needs to go in",
        },
        {
            id: 2,
            question: "Another question here",
            answer: "Another answer for testing.",
        },
        {
            id: 3,
            question: "One more?",
            answer: "Yes, why not.",
        },
    ]);

    const [deletingId, setDeletingId] = useState<number>(0);

    const handleConfirmDelete = (id: number) => {
        setFaqs((prev) => prev.filter((item) => item.id !== id));
        setDeletingId(0);
    };

    const handleCancel = () => setDeletingId(0);


    return (
        <div className={styles.container}>
            <h2 style={{ fontWeight: 700, marginBottom: "2rem" }}>
                You have similar FAQs in the brain
            </h2>

            {swapped ? (
                <WarningPanel id={id} setSwapped={setSwapped} />
            ) : (
                <div className={styles.card}>
                    <div className={styles.badge}>New</div>
                    <div className={styles.qa}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>
                            {question}
                        </div>
                        <div>{answer}</div>
                    </div>
                    <div className={styles.actionCol}>
                        <button className={styles.confirm} onClick={() => setSwapped(true)}>
                            Confirm Add
                        </button>
                            {dialogShownFromType  != DialogShownFromType.Context && <button className={styles.reject}>Reject</button>}
                    </div>
                </div>
            )}

            < hr style={{ margin: "2rem 0" }} />

            <div
                style={{
                    maxHeight: "350px",
                    overflowY: "auto",
                    marginBottom: "1rem",
                }}
            >
                {faqs.map((faq) =>
                    deletingId === faq.id ? (
                        <DeleteWarningPanel
                            key={faq.id}
                            onCancel={handleCancel}
                            onConfirm={() => handleConfirmDelete(faq.id)}
                        />
                    ) : (
                        <FaqCard key={faq.id} faq={faq} onDelete={(id) => setDeletingId(id)} />
                    )
                )}
            </div>
        </div>
    );
}


export default SimilarFaq;