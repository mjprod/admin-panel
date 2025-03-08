import TopBar, { TopBarType } from "./components/topBar/TopBar";
import Sidebar from "./components/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/bottomBar/BottomBar";

const NewManager = () => {
  return (
    <div className={styles["main-container"]}>
      <Sidebar />
      <main>
        <TopBar topBarType={TopBarType.PreApproved} total={300} />
        <div className={styles["question-group-scroll-container"]}>

        </div>
        <BottomBar totalPages={10} currentPage={1} />
      </main>
    </div>
  );
};

export default NewManager;
