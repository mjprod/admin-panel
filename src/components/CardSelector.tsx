import React from "react";
import styles from "./CardSelector.module.css";
import clsx from "clsx";
import Badge, { BadgeType } from "./badge/Badge";
import AssetsPack from "../util/AssetsPack";
import { useTranslation } from "react-i18next";

export const enum SelectorType {
  Delete,
  Write,
}

interface CardSelectorProps {
  title: string;
  type: SelectorType;
  onChecked: (checked: boolean) => void;
  isEdited?: boolean;
  checked?: boolean;
}

const CardSelector: React.FC<CardSelectorProps> = ({
  title,
  type,
  onChecked,
  isEdited = false,
  checked = false,
}) => {
  const {t} = useTranslation();

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
      {isEdited && (
        <div
          className={clsx(
            styles["rightcol"],
            "badge-color-edited",
            styles["badge-color-edited"]
          )}
        >
          <Badge
            text={t("newManager.edited")}
            type={BadgeType.edit}
            icon={AssetsPack.icons.ICON_EDIT.default}
          />
        </div>
      )}
    </div>
  );
};

export default CardSelector;
