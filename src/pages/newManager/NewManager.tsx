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

  useEffect(() => {
    console.log("checked", checked)
    setConversations((conversations) => conversations.map((con) => {
      con.isSelected = checked
      return con
    }))
    console.log("conversations", conversations)
  }, [checked]);

  useEffect(() => {
    console.log("QuestionStatus", statusClicked)
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

  return (
    <div className={styles["main-container"]}>
      <Sidebar onSideCardClicked={setStatusClicked} />
      <main className={clsx(statusClicked !== QuestionStatus.NeedApproval ? styles["main-content"] : "")}>
        <TopBar questionStatus={statusClicked} total={conversations.length} />
        <SelectAllBar questionStatus={statusClicked} checked={checked} onSaveAllClicked={() => setChecked(!checked)} onSelectAllClick={() => setChecked(!checked)} />
        <div className={styles["question-group-scroll-container"]}>
          {conversations.map((con) => (
            <QuestionCard {...con} />
          ))}
        </div>
        <BottomBar totalPages={10} currentPage={1} />
      </main>
    </div>
  );
};

export default NewManager;
