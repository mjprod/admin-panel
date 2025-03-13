import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./BottomBar.module.css";
import { useConversations } from "../../../../store/useConversation";

const BottomBar = () => {

    const {
      currentPage,
      onPrevPageClicked,
      onNextPageClicked,
      totalPages,
    } = useConversations();

    const {t} = useTranslation();
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
          [styles["disabled"]]: currentPage === totalPages,
        })}
      >
        {t("newManager.next")}
      </button>
    </div>
  );
};

export default BottomBar;
