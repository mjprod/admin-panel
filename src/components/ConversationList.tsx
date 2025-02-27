import React, { useState } from "react";
import ConversationCard from "./ConversationCard";
import styles from "./ConversationList.module.css";
import clsx from "clsx";

interface ConversationListProps {
  conversations: Array<{
    id: number;
    category: string;
    progress: string;
    title: string;
    date: string;
    time: string;
    lang: string;
  }>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className={styles["main-container"]}>
      <div className={styles["conversations-container"]}>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => handleSelect(conv.id)}
            className={clsx(styles["conversation-item"], {
              [styles["selected"]]: selectedId === conv.id,
            })}
          >
            <ConversationCard key={conv.id} {...conv} />
          </div>
        ))}
      </div>
      <div className={styles["pagination"]}>
        <div className={styles["controls"]}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={clsx(styles["iconButton"], {
              [styles["disabled"]]: currentPage === 1,
            })}
          >
            <div> Prev </div>
          </button>

          <div className={styles["pageInfo"]}>
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={clsx(styles["iconButton"], {
              [styles["disabled"]]: currentPage === totalPages,
            })}
          >
            <div> Next </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
