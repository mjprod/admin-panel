import React from "react";
import styles from "./Badge.module.css";
import clsx from "clsx";

export enum BadgeType {
  category = "Category",
  subcategory = "Subcategory",
}

export enum BadgeColor {
  red = "badge-color01",
  blue = "badge-color09",
}

interface BadgeProps {
  text: string;
  type?: BadgeType;
  color?: BadgeColor;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  type = BadgeType.category,
  color = BadgeColor.blue,
}) => {
  const getColor = (type: BadgeType, color: BadgeColor) => {
    if (type === BadgeType.subcategory) {
      return styles["subcategory"];
    }
    return styles[color];
  };
  return (
    <div className={clsx(styles["badge"], getColor(type, color))}>{text}</div>
  );
};

export default Badge;
