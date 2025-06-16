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
import MaxList from "./components/sideMain/contextList/ContextList";
import ChatbotButton from "../chatbot/ChatbotButton";
import BrainList from "./components/sideMain/brainList/BrainList";
import SearchBar from "../../components/searchBar/SearchBar";

const NewManager = () => {
  const { isSignedIn } = useContext(AuthContext);

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
          {statusClicked == SideCardType.Rejected && <SelectAllBar />}
          {statusClicked == SideCardType.Brain && <SearchBar />}
        </div>
        {statusClicked != SideCardType.Context && statusClicked != SideCardType.Brain && <QuestionList />}
        {statusClicked == SideCardType.Context && <MaxList />}
        {statusClicked == SideCardType.Brain && <BrainList />}
        <BottomBar />
      </main>
      <ChatbotButton />
    </div>
  );
};

export default NewManager;
