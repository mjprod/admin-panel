import { useEffect, useState } from "react";
import styles from './SimilarFaq.module.css'
import FaqCard from "./FaqCard";
import WarningPanel from "./WarningPanel";
import { KnowledgeContentCheckSimilarKnowledge } from "../../api/apiCalls";
import { SimilarKnowledge } from "../../api/responsePayload/KnowledgeResponse";
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

const SimilarFaq = () => {
    const [swapped, setSwapped] = useState(false);
    const [faqs, setFaqs] = useState<SimilarKnowledge[]>([]);

    useEffect(() => {
        const fetchSimilarQuestions = async () => {
            try {
                const response = await KnowledgeContentCheckSimilarKnowledge(
                    "Apa yang perlu saya lakukan setelah membuat kesilapan dalam pengisian jumlah?",
                    "Anda perlu mengisi semula dengan jumlah yang betul, iaitu RM11, setelah membuat silap mengisi RM10. Pastikan untuk submit semula. Terima kasih Bosskuu ~ ❤️"
                )
                console.log("KnowledgeContentCheckSimilarKnowledge response:", response?.detail);
                response && setFaqs(response.detail)
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchSimilarQuestions();
    }, [])

    const [deletingId, setDeletingId] = useState<number>(0);

    const handleConfirmDelete = (id: number) => {
        setFaqs((prev) => prev.filter((item) => item.knowledge_content_id !== id));
        setDeletingId(0);
    };

    const handleCancel = () => setDeletingId(0);


    return (
        <div className={styles.container}>
            <h2 style={{ fontWeight: 700, marginBottom: "2rem" }}>
                You have similar FAQs in the brain
            </h2>

            {swapped ? (
                <WarningPanel setSwapped={setSwapped} />
            ) : (
                <div className={styles.card}>
                    <div className={styles.badge}>New</div>
                    <div className={styles.qa}>
                        <div style={{ fontWeight: 600, marginBottom: 8 }}>
                            Question will be here
                        </div>
                        <div>Answer will be here this is the stuff that needs to go in</div>
                    </div>
                    <div className={styles.actionCol}>
                        <button className={styles.confirm} onClick={() => setSwapped(true)}>
                            Confirm Add
                        </button>
                        <button className={styles.reject}>Reject</button>
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
                    deletingId === faq.knowledge_content_id ? (
                        <DeleteWarningPanel
                            key={faq.knowledge_content_id}
                            onCancel={handleCancel}
                            onConfirm={() => handleConfirmDelete(faq.knowledge_content_id)}
                        />
                    ) : (
                        <FaqCard key={faq.knowledge_content_id} faq={faq} onDelete={(id) => setDeletingId(id)} />
                    )
                )}
            </div>
        </div>
    );
}


export default SimilarFaq;