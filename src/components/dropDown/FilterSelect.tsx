import React from "react";
import styles from "./FilterSelect.module.css";

interface FilterSelectProps {
  hint: string;
  options: {
    value: string;
    label: string;
  }[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({ hint, options }) => {
  return (
    <div className={styles["filter-select-container"]}>
      <select
        name="filter"
        id="filterSelect"
        className={styles["filter-select"]}
      >
        <option value="">{hint}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
