import React from "react";
import styles from './WarningPanel.module.css'

interface WarningPanelProps {
    setSwapped: (value: boolean) => void
}

const WarningPanel: React.FC<WarningPanelProps> = ({ setSwapped }) => {
    return (
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
                    <button className={styles.confirm}>Confirm Add</button>
                </div>
            </div>
        </div>
    );
}

export default WarningPanel;