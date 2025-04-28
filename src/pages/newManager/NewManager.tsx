import Sidebar from "./components/sideBar/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/sideMain/bottomBar/BottomBar";
import { useContext } from "react";
import { SideCardType } from "../../util/QuestionStatus";
import QuestionList from "./components/sideMain/questionList/QuestionList";
import { useConversationsContext } from "../../context/ConversationProvider";
import { AuthContext } from "../../context/AuthContext";
import SelectAllBar from "./components/sideMain/topBar/SelectAllBar";
import TopBar from "./components/sideMain/topBar/TopBar";
import MaxList from "./components/sideMain/maxPanel/MaxList";
import ChatbotButton from "../chatbot/ChatbotButton";

const NewManager = () => {
  const { isSignedIn } = useContext(AuthContext);

  // 🔴 Prevent using the context before user logs in
  if (!isSignedIn) {
    return <div>Loading Conversations...</div>;
  }

  const { statusClicked } = useConversationsContext();

  return (
    <div className={styles["main-container"]}>
      <Sidebar />
      <main>
        <div>
          <TopBar />
          <SelectAllBar />
        </div>
        {statusClicked != SideCardType.MaxPanel && <QuestionList />}
        {statusClicked == SideCardType.MaxPanel && <MaxList />}
        <BottomBar />
      </main>
      <ChatbotButton />
    </div>
  );
};

export default NewManager;
