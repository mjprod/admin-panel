import React, { useState } from "react";
import styles from "./FilterSelect.module.css";
import clsx from "clsx";

interface FilterSelectProps {
  hint: string;
  options: any[];
  onChange: (selectedValue: number) => void;
  classNameStyle?: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  hint,
  options,
  onChange,
  classNameStyle,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const id = options.find((cat) => cat.name == value)?.id;
    setSelectedValue(value);
    onChange(id ?? 0);
  };

  return (
    <div className={clsx(styles["filter-select-container"])}>
      <select
        name="filter"
        id="filterSelect"
        className={clsx(styles["filter-select"], classNameStyle)}
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
