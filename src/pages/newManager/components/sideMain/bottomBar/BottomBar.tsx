import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./BottomBar.module.css";
import { RootState } from "../../../../../store/store";
import { useSelector } from "react-redux";
import { useConversationsContext } from "../../../../../context/ConversationProvider";

const BottomBar: React.FC = () => {
  const { t } = useTranslation();
  const { onPrevPageClicked, onNextPageClicked, onPageChanged } = useConversationsContext();
  const { currentPage, totalPages, prevPageUrl, nextPageUrl } = useSelector(
    (state: RootState) => state.pagination
  );

  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage); 
  }, [currentPage]);

  const handlePageChange = () => {
    if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= totalPages && inputPage !== currentPage) {
      onPageChanged(inputPage)
    } 
  };

  return (
    <div className={styles["pagination-container"]}>
      <button
        onClick={() => onPrevPageClicked(prevPageUrl)}
        disabled={currentPage === 1}
        className={clsx({
          [styles["disabled"]]: currentPage === 1,
        })}
      >
        {t("newManager.prev")}
      </button>

      <span className={styles["page-input-wrapper"]}>
        {t("newManager.page")}
        <input
          className={styles["page-input"]}
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(parseInt(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlePageChange();
          }}
          onBlur={handlePageChange}
        />
        {t("newManager.of")} {totalPages}
      </span>

      <button
        onClick={() => onNextPageClicked(nextPageUrl)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={clsx({
          [styles["disabled"]]: currentPage === totalPages || totalPages === 0,
        })}
      >
        {t("newManager.next")}
      </button>
    </div>
  );
};

export default BottomBar;