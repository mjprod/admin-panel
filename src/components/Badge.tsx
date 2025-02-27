import React from "react";
import styles from "./Badge.module.css";
import clsx from "clsx";

export enum BadgeType {
  category = "Category",
  subcategory = "Subcategory",
}

export enum BadgeColor {
    red = "Red",
    blue = "Blue",
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
        switch (color) {
            case BadgeColor.red:
                return styles["badge-color01"];
            case BadgeColor.blue:
                return styles["badge-color09"];
            default:
                return styles["badge-color09"];
        }
    };
  return <div className={clsx(styles["badge"], getColor(type, color))}>{text}</div>;
};

export default Badge;
