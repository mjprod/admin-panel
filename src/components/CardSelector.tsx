import React, { useEffect, useState } from "react";
import styles from "./CardSelector.module.css";
import clsx from "clsx";
import Badge, { BadgeType } from "./badge/Badge";
import AssetsPack from "../util/AssetsPack";

export const enum SelectorType {
  Delete,
  Write,
}

interface CardSelectorProps {
  title: string;
  type: SelectorType;
  onChecked: (checked: boolean) => void;
  isEdited?: boolean;
}

const CardSelector: React.FC<CardSelectorProps> = ({
  title,
  type,
  onChecked,
  isEdited = false,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    onChecked(checked);
  }, [checked, onChecked]);

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
          onChange={() => setChecked(!checked)}
        />
        <label>{title}</label>
      </div>
      {isEdited && (
        <div
          className={clsx(
            styles["rightcol"],
            "badge-color-edited",
            styles["badge-color-edited"]
          )}
        >
          <Badge
            text="Edited"
            type={BadgeType.edit}
            icon={AssetsPack.icons.ICON_EDIT.default}
          />
        </div>
      )}
    </div>
  );
};

export default CardSelector;
