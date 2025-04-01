import Sidebar from "./components/sideBar/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/sideMain/bottomBar/BottomBar";
import { useEffect } from "react";
import { SideCardType } from "../../util/QuestionStatus";
import clsx from "clsx";
import QuestionList from "./components/sideMain/questionList/QuestionList";
import SelectAllBar from "./components/sideMain/topBar/SelectAllBar";
import TopBar from "./components/sideMain/topBar/TopBar";
import MaxList from "./components/sideMain/maxPanel/MaxList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchConversations } from "../../store/slice/conversation.slice";
import { fetchCategories } from "../../store/slice/category.slice";

const NewManager = () => {
  const dispatch = useAppDispatch();
  const { isSignedIn } = useAppSelector((state) => state.auth);
  const { statusClicked } = useAppSelector((state) => state.status);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchCategories());
      dispatch(fetchConversations());
    }
  }, [isSignedIn]);

  // 🔴 Prevent using the context before user logs in
  if (!isSignedIn) {
    return <div>Loading Conversations...</div>;
  }

  return (
    <div className={styles["main-container"]}>
      <Sidebar />
      <main
        className={clsx(
          statusClicked !== SideCardType.NeedApproval &&
            statusClicked !== SideCardType.MaxPanel
            ? styles["main-content"]
            : ""
        )}
      >
        <TopBar />
        <SelectAllBar />
        {statusClicked != SideCardType.MaxPanel && <QuestionList />}
        {statusClicked == SideCardType.MaxPanel && <MaxList />}

        <BottomBar />
      </main>
    </div>
  );
};

export default NewManager;
