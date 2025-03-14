import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./BottomBar.module.css";

interface BottomBarProps {
  currentPage: number;
  onPrevPageClicked: () => void;
  onNextPageClicked: () => void;
  totalPages: number;
}

const BottomBar: React.FC<BottomBarProps> = ({
  currentPage,
  onNextPageClicked,
  onPrevPageClicked,
  totalPages,
}) => {
  const { t } = useTranslation();
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
