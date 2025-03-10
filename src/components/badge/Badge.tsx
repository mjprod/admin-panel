import React from "react";
import styles from "./Badge.module.css";
import clsx from "clsx";
import { TagColor } from "../tags/Tag";

export enum BadgeType {
  category = "category",
  subcategory = "subcategory",
  edit = "edit"
}

interface BadgeProps {
  text: string;
  type?: BadgeType;
  color?: TagColor;
  icon?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  type = BadgeType.category,
  color = TagColor.ALL,
  icon,
}) => {
  const getColor = (type: BadgeType, color: TagColor) => {
    if (type === BadgeType.subcategory) {
      return "subcategory";
    }
    return color;
  };
  return (
    <div className={clsx(styles["badge"], getColor(type, color),
    type == BadgeType.edit && styles["edit"])}>
      {icon && <img src={`${icon}`} />}
      {text}
    </div>
  );
};

export default Badge;
