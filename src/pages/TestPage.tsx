import React from "react";
// import { TagColor } from "../components/tags/Tag";
// import Badge from "../components/badge/Badge";
// import {
//   CategoryProps,
// } from "./newManager/components/QuestionTools";
// import SideCard, { SideCardStatus } from "./newManager/components/SideCard";
// import QuestionStrengthTab from "../components/language/QuestionStrengthTab";
import { LanguageProps } from "../components/language/Language";
import QuestionCard, {
  QuestionCardProps,
  QuestionCardStatus,
} from "./newManager/components/QuestionCard";
import CreateNewButton from "./newManager/components/CreateNewButton";
// import CreateNewButton from "./newManager/components/CreateNewButton";

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
      {/* <Tag title="Technolodgy" color={TagColor.purple} /> */}
      {/* <Tag title="All" number={1200} color={TagColor.all} /> */}
      {/* <Badge text="Technology" /> */}
      {/* <QuestionTools total={24000} categories={categories} /> */}
      {/* <SideCard status={SideCardStatus.NeedApproval} number={1000} /> */}
      {/* <SideCard status={SideCardStatus.PreApproval} number={1000} /> */}
      {/* <SideCard status={SideCardStatus.Rejected} number={1000} /> */}
      {/* <Language lang={"MY"} langLabel="Malay" /> */}
      {/* <QuestionStrengthTab languages={languages} /> */}
      <CreateNewButton />
      <QuestionCard {...conv} />
      <QuestionCard {...conv2} />
      <QuestionCard {...conv1} />
    </div>
  );
};

export default TestPage;
