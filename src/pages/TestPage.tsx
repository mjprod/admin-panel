import React from "react";
// import FilterSelect from "../components/dropDown/FilterSelect";
import Tag, { TagColor } from "../components/tags/Tag";
import Badge from "../components/badge/Badge";
import QuestionTools, {
  CategoryProps,
} from "./newManager/components/QuestionTools";
import SideCard, { SideCardStatus } from "./newManager/components/SideCard";

const TestPage = () => {
  const categories: CategoryProps[] = [
    {
      title: "All",
      number: 24000,
      color: TagColor.all,
      isSelected: false,
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
  ];
  return (
    <div>
      <Tag title="Technolodgy" color={TagColor.purple} />
      <Tag title="All" number={1200} color={TagColor.all} />
      <Badge text="Technology" />
      <QuestionTools total={24000} categories={categories} />
      <SideCard status={SideCardStatus.NeedApproval} number={1000} />
      <SideCard status={SideCardStatus.PreApproval} number={1000} />
      <SideCard status={SideCardStatus.Rejected} number={1000} />
    </div>
  );
};

export default TestPage;
