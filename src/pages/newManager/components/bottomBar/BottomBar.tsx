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
  return (
    <div className={styles["pagination-container"]}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx({
          [styles["disabled"]]: currentPage === 1,
        })}
      >
        Prev
      </button>
      <p>
        Page {currentPage} of {totalPages}
      </p>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx({
          [styles["disabled"]]: currentPage === totalPages,
        })}
      >
        Next
      </button>
    </div>
  );
};

export default BottomBar;
