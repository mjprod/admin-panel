import React, { useContext } from "react";
import styles from './WarningPanel.module.css'
import { DialogContext } from "../../context/DialogContext";
import { KowledgeContentBulkUpdateStatus } from "../../api/apiCalls";
import { QuestionStatus } from "../../util/QuestionStatus";

interface WarningPanelProps {
    id: number
    setSwapped: (value: boolean) => void
}

const WarningPanel: React.FC<WarningPanelProps> = ({ id, setSwapped }) => {
    const { dismissDialog } = useContext(DialogContext);

    const handleConfirm = async () => {
        await KowledgeContentBulkUpdateStatus([id], QuestionStatus.Approved);
        setSwapped(false)
        dismissDialog()
    }

 

    return (<>
        <div className={styles.warningBox}>
            <div className={styles.warningInner}>
                <div className={styles.warningTitle}>
                    This New FAQ Will directly write into the brain.
                </div>
                <div className={styles.warningText}>
                    Please check similarities of other FAQs below
                </div>
                <div className={styles.warningActions}>
                    <button onClick={() => setSwapped(false)} className={styles.cancel}>
                        Cancel
                    </button>
                    <button className={styles.confirm} onClick={handleConfirm}>Confirm Add</button>
                </div>
            </div>
        </div>
       
    </>
    );
}

export default WarningPanel;