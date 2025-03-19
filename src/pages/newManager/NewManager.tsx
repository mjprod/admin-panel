import TopBar from "./components/topBar/TopBar";
import Sidebar from "./components/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/bottomBar/BottomBar";
import { useContext, useEffect, useState } from "react";
import { QuestionStatus } from "../../util/QuestionStatus";
import clsx from "clsx";
import SelectAllBar from "./components/topBar/SelectAllBar";
import QuestionList from "./components/QuestionList";
import { useConversationsContext } from "../../context/ConversationProvider";
import {
  KowledgeContentBulkDelete,
  KowledgeContentBulkUpdate,
} from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

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
    setStatusClicked,
    filterByCategory,
    totalCount,
    currentPage,
    onPrevPageClicked,
    onNextPageClicked,
    totalPages,
    setUpdateConversationList,
    categoriesFilter,
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

    if (statusClicked == QuestionStatus.PreApproved) {
      try {
        const res = await KowledgeContentBulkUpdate(conversationIds, 3);
        console.log("Res KowledgeContentBulkUpdate", conversationIds, res);
      } catch (e) {
        console.log(e);
      }
    }

    if (statusClicked == QuestionStatus.Rejected) {
      try {
        const res = await KowledgeContentBulkDelete(conversationIds);
        console.log("Res KowledgeContentBulkDelete", conversationIds, res);
      } catch (e) {
        console.log(e);
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
      <Sidebar
        card={statusClicked}
        onSideCardClicked={setStatusClicked}
        categories={categoriesFilter}
        onCategoryClick={filterByCategory}
      />
      <main
        className={clsx(
          statusClicked !== QuestionStatus.NeedApproval
            ? styles["main-content"]
            : ""
        )}
      >
        <TopBar statusClicked={statusClicked} totalCount={totalCount} />
        <SelectAllBar
          questionStatus={statusClicked}
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
