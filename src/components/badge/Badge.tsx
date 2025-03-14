import React from "react";
import styles from "./Badge.module.css";
import clsx from "clsx";
import { ColorTagDetails } from "../../util/ExampleData";

export enum BadgeType {
  category = "category",
  subcategory = "subcategory",
  edit = "edit",
}

interface BadgeProps {
  text: string;
  type?: BadgeType;
  color?: ColorTagDetails;
  icon?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  type = BadgeType.category,
  color = {
    borderColor: "#fff",
    lightColor: "#fff",
    darkColor: "#fff",
  },
  icon,
}) => {
  const getColor = (type: BadgeType, color: ColorTagDetails) => {
    if (type === BadgeType.subcategory) {
      return "subcategory";
    }
    return color;
  };
  return (
    <div
      className={clsx(
        styles["badge"],
        getColor(type, color),
        type == BadgeType.edit && styles["edit"]
      )}
      style={
        type === BadgeType.category
          ? {
              backgroundColor: color.lightColor,
              borderColor: color.borderColor,
              color: color.darkColor,
            }
          : undefined
      }
    >
      {icon && <img src={`${icon}`} />}
      {text}
    </div>
  );
};

export default Badge;
