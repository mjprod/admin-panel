import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./BottomBar.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { fetchConversationsByUrl } from "../../../../../store/slice/conversation.slice";

interface BottomBarProps {
}

const BottomBar: React.FC<BottomBarProps> = ({
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {currentPage, totalPages, nextPageUrl, prevPageUrl} = useAppSelector((state) => state.pagination);

  const onPrevPageClicked = () => {
    if (prevPageUrl) {
      dispatch(fetchConversationsByUrl(prevPageUrl));
    }
  };

  const onNextPageClicked = () => {
    if (nextPageUrl) {
      dispatch(fetchConversationsByUrl(nextPageUrl));
    }
  };
    
  return (
    <div className={styles["pagination-container"]}>
      <button
        onClick={onPrevPageClicked}
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
        onClick={onNextPageClicked}
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
