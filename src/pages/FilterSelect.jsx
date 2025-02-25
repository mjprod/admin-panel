import React from "react";

const FilterSelect = () => {
  return (
    <select name="filter" id="filterSelect">
      <option value="">Filter by</option>
      <option value="pre-approved">Pre-Approved</option>
      <option value="disapproved">Disapproved</option>
      <option value="all">Default/Show All</option>
    </select>
  );
};

export default FilterSelect;