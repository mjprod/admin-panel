import { useTranslation } from "react-i18next";
import styles from "./BottomBar.module.css";

interface BottomBarProps {
    totalPages: number;
    currentPage: number;
};

const BottomBar = ({ currentPage, totalPages }: BottomBarProps) => {

    const {t} = useTranslation();
    
    return (
        <div className={styles["pagination-container"]}>
            <button>{t("newManager.prev")}</button>
            <p>{t("newManager.page")} {currentPage} {t("newManager.of")} {totalPages}</p>
            <button>{t("newManager.next")}</button>
        </div>
    );
};

export default BottomBar;
