import React from "react";
import styles from "./Sidebar.module.css";
import QuestionTools, { CategoryProps } from "./QuestionTools";
import SideCard from "./SideCard";
import CreateNewButton from "./CreateNewButton";
import { QuestionStatus } from "../../../util/QuestionStatus";

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
  return (
    <aside className={styles["sidebar"]}>
      <QuestionTools
        total={24000}
        categories={categories}
        onCategoryClick={onCategoryClick}
      />

      <div className={styles["list-container"]}>
        <CreateNewButton />
        <SideCard
          isActive={card == QuestionStatus.NeedApproval}
          status={QuestionStatus.NeedApproval}
          number={1000}
          onSideCardClicked={onSideCardClicked}
        />
        <SideCard
          isActive={card == QuestionStatus.PreApproved}
          status={QuestionStatus.PreApproved}
          number={1000}
          onSideCardClicked={onSideCardClicked}
        />
        <SideCard
          isActive={card == QuestionStatus.Rejected}
          status={QuestionStatus.Rejected}
          number={1000}
          onSideCardClicked={onSideCardClicked}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
