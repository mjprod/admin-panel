import styles from "./BottomBar.module.css";

interface BottomBarProps {
    totalPages: number;
    currentPage: number;
};

const BottomBar = ({ currentPage, totalPages }: BottomBarProps) => {

    return (
        <div className={styles["pagination-container"]}>
            <button>Prev</button>
            <p>Page {currentPage} of {totalPages}</p>
            <button>Next</button>
        </div>
    );
};

export default BottomBar;
