import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./BottomBar.module.css";
import { RootState } from "../../../../../store/store";
import { useSelector } from "react-redux";
import { useConversationsContext } from "../../../../../context/ConversationProvider";

interface BottomBarProps {}

const BottomBar: React.FC<BottomBarProps> = ({}) => {
  const { t } = useTranslation();

  const { onPrevPageClicked, onNextPageClicked } = useConversationsContext();
  const { currentPage, totalPages, prevPageUrl, nextPageUrl } = useSelector(
    (state: RootState) => state.pagination
  );

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
      <p>
        {t("newManager.page")} {currentPage} {t("newManager.of")} {totalPages}
      </p>
      <button
        onClick={() => onNextPageClicked(nextPageUrl)}
        disabled={currentPage === totalPages}
        className={clsx({
          [styles["disabled"]]: currentPage === totalPages || totalPages == 0,
        })}
      >
        {t("newManager.next")}
      </button>
    </div>
  );
};

export default BottomBar;
