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
// import CreateNewButton from "./newManager/components/CreateNewButton";

const TestPage = () => {
  // const categories: CategoryProps[] = [
  //   {
  //     title: "All",
  //     number: 24000,
  //     color: TagColor.all,
  //   },
  //   {
  //     title: "4D Lotto",
  //     number: 1356,
  //     color: TagColor.pink,
  //   },
  //   {
  //     title: "3rd Party",
  //     number: 1356,
  //     color: TagColor.navyBlue,
  //   },
  // ];

  const languages: LanguageProps[] = [
    {
      lang: "MY",
      isSolid: true,
    },
    {
      lang: "CN",
    },
    {
      lang: "EN",
      isCompleted: true,
    },
  ];

  const conv: QuestionCardProps = {
    date: "15/2/2025",
    time: "12:24:01 pm",
    conversationId: "12345789489s89asda",
    category: "Technology",
    languages: languages,
    currentlang: {
      lang: "MY",
      langLabel: "Malay",
    },
    subcategories: ["Subcategory 01", "Subcategory 02"],
    question: "Mengapa deposit saya tidak ditunjukkan?",
    answer: "Sila semak penyata bank anda",
    status: QuestionCardStatus.NeedApproval,
  };

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
      {/* <CreateNewButton /> */}
      <QuestionCard {...conv} />
    </div>
  );
};

export default TestPage;
