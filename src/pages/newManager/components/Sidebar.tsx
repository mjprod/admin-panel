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
      color: TagColor.All,
      isSelected: true,
    },
    {
      title: "4D Lotto",
      number: 1356,
      color: TagColor.FourDLotto,
      isSelected: false,
    },
    {
      title: "3rd Party",
      number: 1356,
      color: TagColor.Thrdparty,
      isSelected: false,
    },
    {
      title: "Account",
      number: 136,
      color: TagColor.Account,
      isSelected: false,
    },
    {
      title: "finance",
      number: 396,
      color: TagColor.Finance,
      isSelected: false,
    },

    {
      title: "Lucky7",
      number: 972,
      color: TagColor.PointsShop,
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
