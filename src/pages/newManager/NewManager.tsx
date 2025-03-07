import Sidebar from "./components/Sidebar";
import styles from "./NewManager.module.css";

const NewManager = () => {
  return (
    <div className={styles["main-container"]}>
      <Sidebar />
    </div>
  );
};

export default NewManager;
