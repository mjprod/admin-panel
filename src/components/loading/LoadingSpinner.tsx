import React from 'react';
import styles from "./LoadingSpinner.module.css"

interface LoadingSpinnerProps {
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ }) => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
        </div>
    );
};

export default LoadingSpinner;