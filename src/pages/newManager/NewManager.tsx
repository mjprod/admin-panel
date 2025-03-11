import TopBar from "./components/topBar/TopBar";
import Sidebar from "./components/Sidebar";
import styles from "./NewManager.module.css";
import BottomBar from "./components/bottomBar/BottomBar";
import QuestionCard from "./components/QuestionCard";
import {
  approvedConvs,
  needApprovalConvs,
  rejectedConvs,
} from "../../util/ExampleData";
import { useEffect, useState } from "react";
import { QuestionStatus } from "../../util/QuestionStatus";
import clsx from "clsx";
import SelectAllBar from "./components/topBar/SelectAllBar";

const NewManager = () => {
  const [statusClicked, setStatusClicked] = useState(
    QuestionStatus.NeedApproval
  );
  const [conversations, setConversations] = useState(needApprovalConvs);
  const [checked, setChecked] = useState(false)
  const [showActionButton, setShowActionButton] = useState(false)

  useEffect(() => {
    conversations.some((conv) => conv.isSelected) ? setShowActionButton(true) : setShowActionButton(false);
    conversations.some((conv) => !conv.isSelected) ? setChecked(false) : setChecked(true);
  }, [conversations])

  useEffect(() => {
    switch (statusClicked) {
      case QuestionStatus.NeedApproval:
        setConversations(needApprovalConvs);
        break
      case QuestionStatus.PreApproved:
        setConversations(approvedConvs);
        break
      case QuestionStatus.Rejected:
        setConversations(rejectedConvs);
        break
    }
  }, [statusClicked]);

  const handleConversationSelected = (conversationId: string, checked: boolean) => {
    const convo = conversations.find((conv) => conv.conversationId === conversationId)
    if (convo) {
      convo.isSelected = checked
      setConversations([...conversations]);
    }
  }

  const handleBulkAction = () => {
    setConversations((conversations) => conversations.map((con) => {
      con.isSelected = false
      return con
    }))
  }
  const handleSelectAll = () => {
    setConversations((conversations) => conversations.map((con) => {
      con.isSelected = !checked
      return con
    }))
  }

  return (
    <div className={styles["main-container"]}>
      <Sidebar onSideCardClicked={setStatusClicked} />
      <main className={clsx(statusClicked !== QuestionStatus.NeedApproval ? styles["main-content"] : "")}>
        <TopBar questionStatus={statusClicked} total={conversations.length} />
        <SelectAllBar questionStatus={statusClicked} showActionButton={showActionButton} checked={checked} onSelectAllClick={handleSelectAll} onBulkActionCommit={handleBulkAction} />
        <div className={styles["question-group-scroll-container"]}>
          {conversations.map((con) => (
            <QuestionCard {...con} onSelected={handleConversationSelected} />
          ))}
        </div>
        <BottomBar totalPages={10} currentPage={1} />
      </main>
    </div>
  );
};

export default NewManager;
