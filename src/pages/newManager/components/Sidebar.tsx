import React from "react";
import styles from "./Sidebar.module.css";
import QuestionTools, { CategoryProps } from "./QuestionTools";
import { TagColor } from "../../../components/tags/Tag";
import SideCard, { SideCardStatus } from "./SideCard";
import CreateNewButton from "./CreateNewButton";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const categories: CategoryProps[] = [
    {
      title: "All",
      number: 24000,
      color: TagColor.all,
      isSelected: true,
    },
    {
      title: "4D Lotto",
      number: 1356,
      color: TagColor.pink,
      isSelected: false,
    },
    {
      title: "3rd Party",
      number: 1356,
      color: TagColor.navyBlue,
      isSelected: false,
    },
    {
      title: "Account",
      number: 136,
      color: TagColor.goldish,
      isSelected: false,
    },
    {
      title: "finance",
      number: 396,
      color: TagColor.cobalt,
      isSelected: false,
    },

    {
      title: "Lucky7",
      number: 972,
      color: TagColor.red,
      isSelected: false,
    },
  ];

  return (
    <aside className={styles["sidebar"]}>
      <QuestionTools total={24000} categories={categories} />

      <div className={styles["list-container"]}>
        <CreateNewButton />
        <SideCard status={SideCardStatus.NeedApproval} number={1000} />
        <SideCard status={SideCardStatus.PreApproval} number={1000} />
        <SideCard status={SideCardStatus.Rejected} number={1000} />
      </div>
    </aside>
  );
};

export default Sidebar;
