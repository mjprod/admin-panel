import { useContext, useState, useEffect } from "react";
import styles from './SimilarFaq.module.css'
import FaqCard from "./FaqCard";
import WarningPanel from "./WarningPanel";
import { DialogShownFromType } from "./Dialog";
import PopUpFeedback from "../popUp/popUpRejectFeedback/PopUpFeedback";
import { showConsoleError, showConsoleMessage } from "../../util/ConsoleMessage";
import { KowledgeContentUpdateReject } from "../../api/apiCalls";
import { QuestionStatus } from "../../util/QuestionStatus";
import { DialogContext } from "../../context/DialogContext";
import { KnowledgeContentCheckSimilarKnowledge } from "../../api/apiCalls";
import { SimilarKnowledge } from "../../api/responsePayload/KnowledgeResponse";
import LoadingSpinner from "../loading/LoadingSpinner";
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
    const { dismissDialog } = useContext(DialogContext);
    const [faqs, setFaqs] = useState<SimilarKnowledge[]>([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchSimilarQuestions = async () => {
            try {
                const response = await KnowledgeContentCheckSimilarKnowledge(
                    question,
                    answer ?? ""
                )
                console.log("KnowledgeContentCheckSimilarKnowledge response:", response?.detail);
                response && setFaqs(response.detail)
                setLoading(false)
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
    const [open, setOpen] = useState(false);
    const handleReject = () => {
        setOpen(true)
    }

    const handleRejectModalSubmit = async (
        selectOption: number,
        textMessage: string
    ) => {
        try {
            showConsoleMessage(selectOption, textMessage);
            await KowledgeContentUpdateReject(
                id,
                QuestionStatus.Rejected,
                selectOption,
                textMessage
            );

            //TODO: please refresh page
            // setUpdateConversationList(true);
            dismissDialog()
        } catch (e) {
            showConsoleError(e);
        }
    };

    return (
        <>
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
                            {dialogShownFromType != DialogShownFromType.Context && <button className={styles.reject} onClick={handleReject}>Reject</button>}
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
                    {isLoading && <LoadingSpinner />}
                </div>
            </div>
            {open && (
                <PopUpFeedback
                    key={id}
                    isOpen={open}
                    handleSubmit={handleRejectModalSubmit}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}


export default SimilarFaq;