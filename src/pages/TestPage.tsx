import React from "react";
// import FilterSelect from "../components/dropDown/FilterSelect";
import Tag, { TagColor } from "../components/tags/Tag";
import Badge from "../components/badge/Badge";

const TestPage = () => {
  return (
    <div>
      <Tag title="Technolodgy" color={TagColor.purple} />
      <Tag title="All" number={1200} color={TagColor.all} />
      <Badge text="Technology" />
    </div>
  );
};

export default TestPage;
