import React from "react";
import styles from "./Loading.module.css";
import { useLoading } from "../context/LoadingContext";

const Loading: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <span className={styles.loadingText}>Loading...</span>
    </div>
  );
};

export default Loading;
