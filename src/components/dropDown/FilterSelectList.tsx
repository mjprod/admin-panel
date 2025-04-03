import React from "react";
import FilterSelect, { FilterSelectProps } from "./FilterSelect";
import styles from "./FilterSelectList.module.css";

interface FilterSelectListProps {
  data: FilterSelectProps[];
}

const FilterSelectList: React.FC<FilterSelectListProps> = ({ data }) => {
  return (
    <div className={styles["category-container"]}>
      {data.map((filterSelectProps, index) => (
        <FilterSelect key={index} {...filterSelectProps} />
      ))}
    </div>
  );
};

export default FilterSelectList;
