import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import QuestionTools, { CategoryProps } from "./QuestionTools";
import SideCard from "./SideCard";
import CreateNewButton from "./CreateNewButton";
import { QuestionStatus } from "../../../util/QuestionStatus";
import { useConversationsContext } from "../../../context/ConversationProvider";
import { AuthContext } from "../../../context/AuthContext";

interface SidebarProps {
  card: QuestionStatus;
  onSideCardClicked: (status: QuestionStatus) => void;
  categories: CategoryProps[];
  onCategoryClick: (category: CategoryProps) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  card,
  onSideCardClicked,
  categories,
  onCategoryClick,
}) => {
  const { totalKnowledgeCount } = useConversationsContext();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={styles["sidebar"]}>
      <QuestionTools
        total={totalKnowledgeCount}
        categories={categories}
        onCategoryClick={onCategoryClick}
      />

      <div className={styles["list-container"]}>
        <CreateNewButton />
        <SideCard
          isActive={card == QuestionStatus.NeedApproval}
          status={QuestionStatus.NeedApproval}
          onSideCardClicked={onSideCardClicked}
          classNameStyle={styles["timeline-card"]}
        />
        <SideCard
          isActive={card == QuestionStatus.PreApproved}
          status={QuestionStatus.PreApproved}
          onSideCardClicked={onSideCardClicked}
          classNameStyle={styles["timeline-card"]}
        />
        <SideCard
          isActive={card == QuestionStatus.Rejected}
          status={QuestionStatus.Rejected}
          onSideCardClicked={onSideCardClicked}
          classNameStyle={styles["timeline-card"]}
        />
      </div>

      <div className={styles["logout"]} onClick={handleLogout}>
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;
