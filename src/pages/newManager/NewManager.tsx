import Sidebar from "./components/sideBar/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/sideMain/bottomBar/BottomBar";
import { useContext, useEffect, useState } from "react";
import { SideCardType } from "../../util/QuestionStatus";
import clsx from "clsx";
import QuestionList from "./components/sideMain/questionList/QuestionList";
import { useConversationsContext } from "../../context/ConversationProvider";
import {
  KowledgeContentBulkDelete,
  KowledgeContentBulkUpdate,
} from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";
import { showConsoleError } from "../../util/ConsoleMessage";
import SelectAllBar from "./components/sideMain/topBar/SelectAllBar";
import TopBar from "./components/sideMain/topBar/TopBar";

const NewManager = () => {
  const { isSignedIn } = useContext(AuthContext);

  // 🔴 Prevent using the context before user logs in
  if (!isSignedIn) {
    return <div>Loading Conversations...</div>;
  }

  const {
    conversations,
    setConversations,
    statusClicked,
    currentPage,
    onPrevPageClicked,
    onNextPageClicked,
    totalPages,
    setUpdateConversationList,
  } = useConversationsContext();

  const [checked, setChecked] = useState(false);
  const [showActionButton, setShowActionButton] = useState(false);

  useEffect(() => {
    conversations.some((conv) => conv.isSelected)
      ? setShowActionButton(true)
      : setShowActionButton(false);
    conversations.some((conv) => !conv.isSelected)
      ? setChecked(false)
      : setChecked(true);

    if (conversations.length == 0) setChecked(false);
  }, [conversations]);

  const handleConversationSelected = (
    conversationId: string,
    checked: boolean
  ) => {
    const convo = conversations.find(
      (conv) => conv.conversationId === conversationId
    );
    if (convo) {
      convo.isSelected = checked;
      setConversations([...conversations]);
    }
  };

  const handleBulkAction = async () => {
    const conversationIds: number[] = conversations
      .filter((con) => con.isSelected === true)
      .map((con) => con.id);

    if (statusClicked == SideCardType.PreApproved) {
      try {
        await KowledgeContentBulkUpdate(conversationIds, 3);
      } catch (e) {
        showConsoleError(e);
      }
    }

    if (statusClicked == SideCardType.Rejected) {
      try {
        await KowledgeContentBulkDelete(conversationIds);
      } catch (e) {
        showConsoleError(e);
      }
    }

    setConversations((conversations) =>
      conversations.map((con) => {
        con.isSelected = false;
        return con;
      })
    );

    setUpdateConversationList(true);
  };

  const handleSelectAll = () => {
    setConversations((conversations) =>
      conversations.map((con) => {
        con.isSelected = !checked;
        return con;
      })
    );
  };

  return (
    <div className={styles["main-container"]}>
      <Sidebar />
      <main
        className={clsx(
          statusClicked !== SideCardType.NeedApproval && statusClicked !== SideCardType.MaxPanel
            ? styles["main-content"]
            : ""
        )}
      >
        <TopBar />
        <SelectAllBar
          showActionButton={showActionButton}
          checked={checked}
          onSelectAllClick={handleSelectAll}
          onBulkActionCommit={handleBulkAction}
        />
        <QuestionList
          conversations={conversations}
          onSelected={handleConversationSelected}
        />
        <BottomBar
          currentPage={currentPage}
          onPrevPageClicked={onPrevPageClicked}
          onNextPageClicked={onNextPageClicked}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
};

export default NewManager;
