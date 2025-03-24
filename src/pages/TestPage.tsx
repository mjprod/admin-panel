import React from "react";
import TopBar from "./newManager/components/sideMain/topBar/TopBar";
// import SideCard from "./newManager/components/sideBar/sideCard/SideCard";
// import { SideCardType } from "../util/QuestionStatus";

const TestPage = () => {
  return (
    <div>
      {/* <SideCard type={SideCardType.Core} />
      <SideCard type={SideCardType.MaxPanel} />
      <SideCard type={SideCardType.NeedApproval} /> */}
      <TopBar />
    </div>
  );
};

export default TestPage;
