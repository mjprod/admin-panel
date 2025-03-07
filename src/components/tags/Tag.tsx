import React from "react";
import clsx from "clsx";
import styles from "./Tag.module.css";

export enum TagColor {
  pink = "badge-color01",
  goldish = "badge-color02",
  purple = "badge-color03",
  brown = "badge-color04",
  green = "badge-color05",
  navyBlue = "badge-color06",
  aqua = "badge-color07",
  red = "badge-color08",
  cobalt = "badge-color09",
  all = "all-tag",
}

interface TagProps {
  title: string;
  number?: number;
  color?: TagColor;
  isSelected?: boolean;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({
  title,
  number,
  color = TagColor.pink,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        styles["tag"],
        styles[color],
        !isSelected ? styles["not-selected"] : styles["selected"]
      )}
      onClick={onClick}
    >
      {title} {number !== undefined && number !== null ? `| ${number}` : ""}
    </div>
  );
};

export default Tag;
