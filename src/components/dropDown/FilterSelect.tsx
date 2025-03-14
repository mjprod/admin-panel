import React, { useState } from "react";
import styles from "./FilterSelect.module.css";

interface FilterSelectProps {
  hint: string;
  options: any[];
  onChange: (selectedValue: number) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  hint,
  options,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const id = options.find((cat) => cat.name == value).id;
    setSelectedValue(value);
    onChange(id);
  };

  return (
    <div className={styles["filter-select-container"]}>
      <select
        name="filter"
        id="filterSelect"
        className={styles["filter-select"]}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="">{hint}</option>
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
