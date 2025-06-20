import React from "react";
import styles from "./Loading.module.css";
import { useLoading } from "../../context/LoadingContext";
import LoadingSpinner from "./LoadingSpinner";

const Loading: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className={styles.loadingContainer}>
      <LoadingSpinner />
      <span className={styles.loadingText}>Loading...</span>
    </div>
  );
};

export default Loading;
