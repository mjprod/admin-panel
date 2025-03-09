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

const NewManager = () => {
  const [statusClicked, setStatusClicked] = useState(
    QuestionStatus.NeedApproval
  );
  const [conversations, setConversations] = useState(needApprovalConvs);

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
      <main>
        <TopBar topBarType={statusClicked} total={300} />
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
