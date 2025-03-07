import TopBar, { TopBarType } from "../../components/topBar/TopBar";
import Sidebar from "./components/Sidebar";
import styles from "./NewManager.module.css";

const NewManager = () => {
  return (
    <div className={styles["main-container"]}>
      <Sidebar />
      <main>
        <TopBar topBarType={TopBarType.PreApproved} total={300} />
      </main>
    </div>
  );
};

export default NewManager;
