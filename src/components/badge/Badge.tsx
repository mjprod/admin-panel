import React from "react";
import styles from "./Badge.module.css";
import clsx from "clsx";
import { TagColor } from "../tags/Tag";

export enum BadgeType {
  category = "Category",
  subcategory = "Subcategory",
}

interface BadgeProps {
  text: string;
  type?: BadgeType;
  color?: TagColor;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  type = BadgeType.category,
  color = TagColor.ALL,
}) => {
  const getColor = (type: BadgeType, color: TagColor) => {
    if (type === BadgeType.subcategory) {
      return styles["subcategory"];
    }
    return color;
  };
  return (
    <div className={clsx(styles["badge"], getColor(type, color))}>{text}</div>
  );
};

export default Badge;
