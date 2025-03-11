import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./BottomBar.module.css";

interface BottomBarProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const BottomBar = ({
  currentPage,
  totalPages,
  onPageChange,
}: BottomBarProps) => {

    const {t} = useTranslation();
      return (
    <div className={styles["pagination-container"]}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx({
          [styles["disabled"]]: currentPage === totalPages,
        })}
      >
        {t("newManager.next")}
      </button>
    </div>
  );
};

export default BottomBar;
