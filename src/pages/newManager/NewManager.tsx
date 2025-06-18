import Sidebar from "./components/sideBar/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/sideMain/bottomBar/BottomBar";
import { useContext, useState, useRef } from "react";
import { SideCardType } from "../../util/QuestionStatus";
import QuestionList from "./components/sideMain/questionList/QuestionList";
import { useConversationsContext } from "../../context/ConversationProvider";
import { AuthContext } from "../../context/AuthContext";
import SelectAllBar from "./components/sideMain/topBar/SelectAllBar";
import TopBar from "./components/sideMain/topBar/TopBar";
import MaxList from "./components/sideMain/contextList/ContextList";
// import ChatbotButton from "../chatbot/ChatbotButton";
import BrainList from "./components/sideMain/brainList/BrainList";
import SearchBar from "../../components/searchBar/SearchBar";
import CustomButton, { ButtonType } from "../../components/button/CustomButton";
import MyChatBot from "../chatbot/MyChatBot";

const NewManager = () => {
  const { isSignedIn } = useContext(AuthContext);
  const bodyRef = useRef<HTMLDivElement>(null);

  const { setRefreshContext } = useConversationsContext()
  const [openChatBot, setOpenChatBot] = useState(false)
  if (!isSignedIn) {
    return <div>Loading Conversations...</div>;
  }

  const { statusClicked } = useConversationsContext();
  const handleSyncAll = () => {
    setRefreshContext(true)
  }
  const handleOpenChatBot = () => {
    setOpenChatBot(prev => !prev)
  }
  return (
    <div className={styles["main-container"]}>
      <Sidebar />
      <main>
        <div>
          <TopBar />
          {statusClicked == SideCardType.Rejected && <SelectAllBar />}
          {statusClicked == SideCardType.Brain && <SearchBar />}
          {statusClicked == SideCardType.Context && <div className={styles['sync-all']}> <CustomButton
            text={"Update Context"}
            type={ButtonType.Normal}
            onClick={handleSyncAll}
          />
          </div>}
        </div>
        <div id="body-view" className={styles['body-view']} ref={bodyRef}>
          {statusClicked != SideCardType.Context && statusClicked != SideCardType.Brain && <QuestionList />}
          {statusClicked == SideCardType.Context && <MaxList />}
          {statusClicked == SideCardType.Brain && <BrainList />}
        </div>
        <BottomBar />
      </main>
      {
        openChatBot && <div
          style={{ backgroundColor: "#00000045", position: "absolute", width: "100%", height: "100%" }}
          onClick={handleOpenChatBot}>
          <div
            style={{ position: "absolute", bottom: "12.5rem", right: "5rem" }}
            onClick={(e) => e.stopPropagation()}>
            <MyChatBot chatWindowStyle={{
              height: "70dvh",
              width: "100%"
            }} />
          </div>
        </div>
      }
      <button className={styles["chatbot-button"]} onClick={handleOpenChatBot}>💬</button>
      {/* <ChatbotButton /> */}
    </div>
  );
};

export default NewManager;
