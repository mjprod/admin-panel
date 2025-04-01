import React from "react";
import styles from "./Loading.module.css";
import { useAppSelector } from "../../store/hooks";

const Loading: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <span className={styles.loadingText}>Loading...</span>
    </div>
  );
};

export default Loading;
