import React from "react";
import styles from "./Checkbox.module.css";
import clsx from "clsx";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <input
      className={clsx(styles["styled-checkbox"], styles["align-checkbox"])}
      type="checkbox"
      checked={checked}
      onChange={() => onChange(!checked)}
    />
  );
};

export default Checkbox;
