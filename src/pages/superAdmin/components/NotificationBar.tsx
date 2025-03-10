import React from "react";
import styles from "./NotificationBar.module.css";

interface NotificationBarProps {
  title: string;
  message: string;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ title, message }: NotificationBarProps) => {
  return (
    <div className={styles["notification-bar"]}>
      <strong>{title}: </strong>
       一 {message}
    </div>
  );
};

export default NotificationBar;
