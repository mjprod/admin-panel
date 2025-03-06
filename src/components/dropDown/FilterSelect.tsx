import React from "react";
import styles from "./FilterSelect.module.css";

const FilterSelect = () => {
  return (
    <div className={styles["filter-select-container"]}>
      <select
        name="filter"
        id="filterSelect"
        className={styles["filter-select"]}
      >
        <option value="">Filter by</option>
        <option value="pre-approved">Pre-Approved</option>
        <option value="disapproved">Disapproved</option>
        <option value="all">Default/Show All</option>
      </select>
    </div>
  );
};

export default FilterSelect;
