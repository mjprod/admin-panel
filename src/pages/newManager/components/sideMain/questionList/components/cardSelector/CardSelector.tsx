import React from "react";
import styles from "./CardSelector.module.css";
import clsx from "clsx";

export const enum SelectorType {
  Delete,
  Write,
}

interface CardSelectorProps {
  title: string;
  type: SelectorType;
  onChecked: (checked: boolean) => void;
  checked?: boolean;
}

const CardSelector: React.FC<CardSelectorProps> = ({
  title,
  type,
  onChecked,
  checked = false,
}) => {

  return (
    <div className={styles["card-selector"]}>
      <div className={styles["leftcol"]}>
        <input
          className={clsx(
            type == SelectorType.Delete && styles["select-for-delete"],
            type == SelectorType.Write && styles["select-for-write"],
            styles["checkbox"]
          )}
          type="checkbox"
          checked={checked}
          onChange={(checked) => onChecked(checked.target.checked)}
        />
        <label>{title}</label>
      </div>
    </div>
  );
};

export default CardSelector;
